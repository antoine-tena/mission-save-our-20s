from rest_framework import serializers
from .models import StargazingSpot

class StargazingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = StargazingSpot
        fields = '__all__'
