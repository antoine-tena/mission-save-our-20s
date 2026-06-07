from rest_framework import serializers
from .models import Photo
from typing import Optional

class PhotoListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Photo
        fields = [
            'id', 'author_name', 'titre', 'description', 
            'image_url', 'latitude', 'longitude', 'date_creation'
        ]

    def get_image_url(self, obj: Photo) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class PhotoDetailSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Photo
        fields = [
            'id', 'author', 'author_name', 'titre', 'description', 
            'image', 'image_url', 'latitude', 'longitude', 'date_creation'
        ]
        extra_kwargs = {
            'image': {'write_only': True}
        }
    
    def get_image_url(self, obj: Photo) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
