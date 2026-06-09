from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import os
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from typing import Optional, Tuple, Any

def photo_upload_path(instance: 'Photo', filename: str) -> str:
    """Génère le chemin d'upload basé sur la date du jour."""
    now = datetime.now()
    return os.path.join(
        'photos',
        now.strftime('%Y'),
        now.strftime('%m'),
        now.strftime('%d'),
        filename
    )

class Album(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='custom_albums', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cover_photo = models.ImageField(upload_to='album_covers/', null=True, blank=True)
    back_cover_photo = models.ImageField(upload_to='album_covers/', null=True, blank=True)
    is_full_wrap = models.BooleanField(default=False)
    cover_color = models.CharField(max_length=50, default='#3d352e')
    show_cover_photo = models.BooleanField(default=True)
    cover_crop_x = models.FloatField(default=0.0)
    cover_crop_y = models.FloatField(default=0.0)
    cover_crop_scale = models.FloatField(default=1.0)
    back_cover_crop_x = models.FloatField(default=0.0)
    back_cover_crop_y = models.FloatField(default=0.0)
    back_cover_crop_scale = models.FloatField(default=1.0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Album"
        verbose_name_plural = "Albums"

    def __str__(self) -> str:
        return self.title

class AlbumPage(models.Model):
    LAYOUT_CHOICES = [
        ('full', 'Pleine Page'),
        ('scrapbook', 'Scrapbook Classique'),
        ('mosaic', 'Mosaïque Asymétrique'),
        ('text-only', 'Texte Seul'),
        ('grid-1', 'Grille 1 Photo'),
        ('grid-2', 'Grille 2 Photos'),
        ('grid-3', 'Grille 3 Photos'),
        ('grid-4', 'Grille 4 Photos'),
        ('grid-5', 'Grille 5 Photos'),
        ('grid-6', 'Grille 6 Photos'),
        ('grid-7', 'Grille 7 Photos'),
        ('grid-8', 'Grille 8 Photos'),
        ('grid-9', 'Grille 9 Photos'),
        ('grid-10', 'Grille 10 Photos'),
    ]
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='pages')
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    layout_type = models.CharField(max_length=50, choices=LAYOUT_CHOICES, default='scrapbook')
    background_color = models.CharField(max_length=50, default='#ffffff')
    sticker = models.CharField(max_length=50, blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Page d'Album"
        verbose_name_plural = "Pages d'Album"

    def __str__(self) -> str:
        return f"Page {self.order} de {self.album.title}"

class Photo(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='photos_uploaded', null=True, blank=True)
    page = models.ForeignKey(AlbumPage, on_delete=models.CASCADE, related_name='photos', null=True, blank=True)
    titre = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    caption = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to=photo_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])]
    )
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    order = models.IntegerField(default=0)
    crop_x = models.FloatField(default=0.0)
    crop_y = models.FloatField(default=0.0)
    crop_scale = models.FloatField(default=1.0)
    custom_width = models.IntegerField(null=True, blank=True)
    custom_height = models.IntegerField(null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-date_creation']
        verbose_name = "Photo"
        verbose_name_plural = "Photos"

    def __str__(self) -> str:
        return self.titre or self.caption or f"Photo {self.id}"

    def _get_gps_info(self, exif_data: dict) -> dict:
        """Filtre et décode les tags GPS de l'EXIF."""
        gps_info = {}
        for tag, value in exif_data.items():
            decoded = TAGS.get(tag, tag)
            if decoded == "GPSInfo":
                for t in value:
                    sub_decoded = GPSTAGS.get(t, t)
                    gps_info[sub_decoded] = value[t]
        return gps_info

    def _convert_to_degrees(self, value) -> float:
        """Convertit les tuples EXIF en degrés décimaux."""
        d = float(value[0])
        m = float(value[1])
        s = float(value[2])
        return d + (m / 60.0) + (s / 3600.0)

    def extract_gps(self) -> None:
        """Extrait les coordonnées GPS des données EXIF de l'image."""
        if not self.image:
            return
        try:
            img = Image.open(self.image.path)
            exif_data = img._getexif()
            if not exif_data:
                return
            gps_info = self._get_gps_info(exif_data)
            if not gps_info:
                return
            lat = self._convert_to_degrees(gps_info['GPSLatitude'])
            if gps_info['GPSLatitudeRef'] != "N":
                lat = -lat
            lon = self._convert_to_degrees(gps_info['GPSLongitude'])
            if gps_info['GPSLongitudeRef'] != "E":
                lon = -lon
            self.latitude, self.longitude = lat, lon
            self.save(update_fields=['latitude', 'longitude'])
        except Exception as exc:
            print(f"DEBUG: EXIF Extraction failed for {self.id}: {exc}")
