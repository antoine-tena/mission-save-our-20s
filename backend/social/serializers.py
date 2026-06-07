from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, SocialPost, FriendRequest
from typing import Optional, Any

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    avatar_url = serializers.SerializerMethodField()
    cover_url = serializers.SerializerMethodField()
    friends_count = serializers.SerializerMethodField()
    mutual_friends_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'bio', 'status', 'avatar', 'avatar_url', 
            'cover_image', 'cover_url', 'friends_count', 
            'mutual_friends_count', 'points'
        ]
        extra_kwargs = {
            'avatar': {'write_only': True},
            'cover_image': {'write_only': True}
        }
    
    def get_avatar_url(self, obj: Profile) -> Optional[str]:
        request = self.context.get('request')
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        return None

    def get_cover_url(self, obj: Profile) -> Optional[str]:
        request = self.context.get('request')
        if obj.cover_image and request:
            return request.build_absolute_uri(obj.cover_image.url)
        return None
    
    def get_friends_count(self, obj: Profile) -> int:
        return obj.friends.count()

    def get_mutual_friends_count(self, obj: Profile) -> int:
        request = self.context.get('request')
        if not (request and request.user.is_authenticated and request.user != obj.user):
            return 0
            
        try:
            my_friends = set(request.user.profile.friends.values_list('id', flat=True))
            their_friends = set(obj.friends.values_list('id', flat=True))
            return len(my_friends.intersection(their_friends))
        except Exception:
            return 0

class SocialPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = SocialPost
        fields = [
            'id', 'author', 'image', 'image_url', 'caption', 
            'created_at', 'likes_count', 'is_liked'
        ]
        extra_kwargs = {
            'image': {'write_only': True}
        }
    
    def get_image_url(self, obj: SocialPost) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def get_likes_count(self, obj: SocialPost) -> int:
        return obj.likes.count()
    
    def get_is_liked(self, obj: SocialPost) -> bool:
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'created_at', 'accepted']
