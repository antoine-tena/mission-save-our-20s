from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import os
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from typing import Optional, Tuple

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

class Photo(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='photos', null=True, blank=True)
    titre = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to=photo_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])]
    )
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_creation']
        verbose_name = "Photo"
        verbose_name_plural = "Photos"

    def __str__(self) -> str:
        return self.titre

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
