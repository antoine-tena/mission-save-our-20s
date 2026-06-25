from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import os
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    pass

def movie_poster_path(movie_instance: 'Movie', filename: str) -> str:
    """Génère le chemin d'upload pour l'affiche du film."""
    return os.path.join('movies', str(movie_instance.date_seen.year), filename)

class Movie(models.Model):
    title = models.CharField(max_length=255)
    poster = models.ImageField(upload_to=movie_poster_path, null=True, blank=True)
    date_seen = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    
    # TMDB Integrated Metadata
    tmdb_id = models.IntegerField(null=True, blank=True)
    overview = models.TextField(blank=True, null=True)
    director = models.CharField(max_length=255, blank=True, null=True)
    cast = models.TextField(blank=True, null=True)
    runtime = models.IntegerField(null=True, blank=True)
    genres = models.CharField(max_length=255, blank=True, null=True)
    
    # Antoine's Perspective
    antoine_review = models.TextField(blank=True)
    antoine_rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        null=True, blank=True
    )
    
    # Amani's Perspective
    amani_review = models.TextField(blank=True)
    amani_rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        null=True, blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='added_movies')

    class Meta:
        ordering = ['-date_seen']
        verbose_name = "Film"
        verbose_name_plural = "Films"

    def __str__(self) -> str:
        return self.title
