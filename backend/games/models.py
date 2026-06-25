from django.db import models
from typing import Text

class GameType(models.Model):
    name = models.CharField(max_length=100) # e.g., Billard, Bowling
    icon = models.CharField(max_length=50, default="lucide:gamepad-2")

    def __str__(self) -> str:
        return self.name

class GameSession(models.Model):
    game_type = models.ForeignKey(GameType, on_delete=models.CASCADE, related_name='sessions')
    date = models.DateField()
    
    # Specific fields for Amani and Antoine as requested
    amani_score = models.IntegerField(default=0)
    antoine_score = models.IntegerField(default=0)
    
    location = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = "Session de Jeu"
        verbose_name_plural = "Sessions de Jeu"

    @property
    def winner(self) -> Text:
        if self.amani_score > self.antoine_score:
            return "Amani"
        if self.antoine_score > self.amani_score:
            return "Antoine"
        return "Égalité"

    def __str__(self) -> str:
        return f"{self.game_type.name} ({self.date}) - Vainqueur: {self.winner}"
