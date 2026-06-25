from rest_framework import serializers
from .models import StargazingSpot

class StargazingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = StargazingSpot
        fields = ['id', 'name', 'latitude', 'longitude', 'date', 'notes', 'created_at']
