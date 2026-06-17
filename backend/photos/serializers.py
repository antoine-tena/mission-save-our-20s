from rest_framework import serializers
from .models import Photo, Album, AlbumPage
from django.contrib.auth.models import User
from typing import Optional, Any
from social.utils import get_absolute_media_url

class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Photo
        fields = [
            'id', 'author', 'author_name', 'page', 'titre', 'description', 
            'caption', 'image', 'image_url', 'thumbnail', 'thumbnail_url', 'latitude', 'longitude', 'order',
            'crop_x', 'crop_y', 'crop_scale', 'custom_width', 'custom_height',
            'custom_x', 'custom_y', 'date_creation'
        ]
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True}
        }
    
    def get_image_url(self, obj: Photo) -> Optional[str]:
        return get_absolute_media_url(self.context.get('request'), obj.image)

    def get_thumbnail_url(self, obj: Photo) -> Optional[str]:
        return get_absolute_media_url(self.context.get('request'), obj.thumbnail)

class AlbumPageSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = AlbumPage
        fields = [
            'id', 'album', 'title', 'description', 'date', 
            'location', 'layout_type', 'background_color', 'sticker', 'order', 'is_auto_color', 'photos'
        ]
        read_only_fields = ['album']

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
        return get_absolute_media_url(self.context.get('request'), obj.cover_photo)

    def get_back_cover_photo_url(self, obj: Album) -> Optional[str]:
        return get_absolute_media_url(self.context.get('request'), obj.back_cover_photo)
