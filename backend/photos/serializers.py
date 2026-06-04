from rest_framework import serializers
from .models import Photo

class PhotoListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'titre', 'description', 'image_url', 'date_creation']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class PhotoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
