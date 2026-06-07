from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Profile, SocialPost, FriendRequest
from .serializers import ProfileSerializer, SocialPostSerializer, FriendRequestSerializer, UserSerializer
from typing import Any

class MyProfileView(APIView):
    """Vue pour voir et modifier son propre profil."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request: Any) -> Response:
        profile, _ = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)
    
    def patch(self, request: Any) -> Response:
        profile, _ = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicProfileView(APIView):
    """Vue pour voir le profil d'un autre utilisateur."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Any, username: str) -> Response:
        user = get_object_or_404(User, username=username)
        profile, _ = Profile.objects.get_or_create(user=user)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

class SocialPostListCreateView(APIView):
    """Vue pour lister et créer des publications sociales."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request: Any) -> Response:
        username = request.query_params.get('username')
        if username:
            posts = SocialPost.objects.filter(author__username=username)
        else:
            posts = SocialPost.objects.all()
        serializer = SocialPostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)
    
    def post(self, request: Any) -> Response:
        serializer = SocialPostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LikePostView(APIView):
    """Vue pour liker/unliker une publication."""
    permission_classes = [IsAuthenticated]

    def post(self, request: Any, pk: int) -> Response:
        post = get_object_or_404(SocialPost, pk=pk)
        if post.likes.filter(id=request.user.id).exists():
            post.likes.remove(request.user)
            return Response({'liked': False})
        post.likes.add(request.user)
        return Response({'liked': True})

class UserListView(APIView):
    """Liste tous les utilisateurs sauf soi-même."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Any) -> Response:
        users = User.objects.exclude(id=request.user.id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class FriendRequestView(APIView):
    """Gère les demandes d'amis (envoi et liste)."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Any) -> Response:
        requests = FriendRequest.objects.filter(to_user=request.user, accepted=False)
        serializer = FriendRequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request: Any, user_id: int) -> Response:
        to_user = get_object_or_404(User, id=user_id)
        if to_user == request.user:
            return Response({'error': 'Impossible de s\'ajouter soi-même.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if request.user.profile.friends.filter(user=to_user).exists():
            return Response({'error': 'Déjà amis.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if FriendRequest.objects.filter(from_user=request.user, to_user=to_user).exists() or \
           FriendRequest.objects.filter(from_user=to_user, to_user=request.user).exists():
            return Response({'error': 'Demande déjà en cours.'}, status=status.HTTP_400_BAD_REQUEST)
        
        FriendRequest.objects.create(from_user=request.user, to_user=to_user)
        return Response({'message': 'Demande envoyée.'}, status=status.HTTP_201_CREATED)

class HandleFriendRequestView(APIView):
    """Vue pour accepter ou décliner une demande d'ami."""
    permission_classes = [IsAuthenticated]

    def post(self, request: Any, request_id: int) -> Response:
        friend_request = get_object_or_404(FriendRequest, id=request_id, to_user=request.user)
        action = request.data.get('action')
        
        if action == 'accept':
            friend_request.accepted = True
            friend_request.save()
            profile1, _ = Profile.objects.get_or_create(user=friend_request.from_user)
            profile2, _ = Profile.objects.get_or_create(user=friend_request.to_user)
            profile1.friends.add(profile2)
            return Response({'message': 'Acceptée.'})
        
        if action == 'decline':
            friend_request.delete()
            return Response({'message': 'Déclinée.'})
        
        return Response({'error': 'Action invalide.'}, status=status.HTTP_400_BAD_REQUEST)
