from django.db import models
from django.core.validators import FileExtensionValidator
import os
from datetime import datetime

def photo_upload_path(instance, filename):
    # Upload dans media/photos/YYYY/MM/DD/filename
    now = datetime.now()
    return os.path.join(
        'photos',
        now.strftime('%Y'),
        now.strftime('%m'),
        now.strftime('%d'),
        filename
    )

class Photo(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to=photo_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])]
    )
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_creation']
        verbose_name = "Photo"
        verbose_name_plural = "Photos"

    def __str__(self):
        return self.titre
