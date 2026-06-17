from rest_framework import serializers
from .models import Movie
from typing import Optional
from social.utils import get_absolute_media_url

class MovieSerializer(serializers.ModelSerializer):
    poster_url = serializers.SerializerMethodField()
    added_by_username = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'poster', 'poster_url', 'date_seen', 'location',
            'latitude', 'longitude',
            'tmdb_id', 'overview', 'director', 'cast', 'runtime', 'genres',
            'antoine_review', 'antoine_rating',
            'amani_review', 'amani_rating',
            'created_at', 'added_by_username'
        ]
        read_only_fields = ['title', 'overview', 'director', 'cast', 'runtime', 'genres']
        extra_kwargs = {
            'poster': {'write_only': True}
        }

    def get_poster_url(self, obj: Movie) -> Optional[str]:
        return get_absolute_media_url(self.context.get('request'), obj.poster)
