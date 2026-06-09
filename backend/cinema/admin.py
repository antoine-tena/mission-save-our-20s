from django.contrib import admin
from .models import Movie

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_seen', 'tmdb_id', 'antoine_rating', 'amani_rating')
    list_filter = ('date_seen', 'added_by', 'genres')
    search_fields = ('title', 'antoine_review', 'amani_review', 'director')
