from django.db import models

class StargazingSpot(models.Model):
    name = models.CharField(max_length=255) # e.g., Bivouac Aravis
    latitude = models.FloatField()
    longitude = models.FloatField()
    date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name
