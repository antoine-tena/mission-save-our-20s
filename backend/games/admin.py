from django.contrib import admin
from .models import GameType, GameSession

@admin.register(GameType)
class GameTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon')

@admin.register(GameSession)
class GameSessionAdmin(admin.ModelAdmin):
    list_display = ('game_type', 'date', 'amani_score', 'antoine_score', 'winner')
    list_filter = ('game_type', 'date')
    search_fields = ('location', 'notes')
