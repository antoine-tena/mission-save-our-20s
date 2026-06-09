from rest_framework import serializers
from .models import Photo, Album, AlbumPage
from django.contrib.auth.models import User
from typing import Optional, Any

class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Photo
        fields = [
            'id', 'author', 'author_name', 'page', 'titre', 'description', 
            'caption', 'image', 'image_url', 'latitude', 'longitude', 'order',
            'crop_x', 'crop_y', 'crop_scale', 'custom_width', 'custom_height', 'date_creation'
        ]
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True}
        }
    
    def get_image_url(self, obj: Photo) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class AlbumPageSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = AlbumPage
        fields = [
            'id', 'album', 'title', 'description', 'date', 
            'location', 'layout_type', 'background_color', 'sticker', 'order', 'photos'
        ]

class AlbumSerializer(serializers.ModelSerializer):
    pages = AlbumPageSerializer(many=True, read_only=True)
    author_name = serializers.ReadOnlyField(source='user.username')
    cover_photo_url = serializers.SerializerMethodField()
    back_cover_photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = [
            'id', 'author_name', 'title', 'description', 
            'cover_photo', 'cover_photo_url', 
            'back_cover_photo', 'back_cover_photo_url',
            'is_full_wrap', 'cover_color', 'show_cover_photo',
            'cover_crop_x', 'cover_crop_y', 'cover_crop_scale',
            'back_cover_crop_x', 'back_cover_crop_y', 'back_cover_crop_scale',
            'created_at', 'pages'
        ]
        extra_kwargs = {
            'cover_photo': {'required': False, 'allow_null': True},
            'back_cover_photo': {'required': False, 'allow_null': True}
        }

    def get_cover_photo_url(self, obj: Album) -> Optional[str]:
        request = self.context.get('request')
        if obj.cover_photo and request:
            return request.build_absolute_uri(obj.cover_photo.url)
        return None

    def get_back_cover_photo_url(self, obj: Album) -> Optional[str]:
        request = self.context.get('request')
        if obj.back_cover_photo and request:
            return request.build_absolute_uri(obj.back_cover_photo.url)
        return None
