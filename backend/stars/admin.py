from django.contrib import admin
from .models import StargazingSpot

@admin.register(StargazingSpot)
class StargazingSpotAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude', 'date', 'created_at')
    list_filter = ('date', 'created_at')
    search_fields = ('name', 'notes')
