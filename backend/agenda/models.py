from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self) -> str:
        return f"{self.title} - {self.date}"
