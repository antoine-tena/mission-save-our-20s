from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Profile, SocialPost, FriendRequest, RichPost, RichPostAttachment
from .serializers import (
    ProfileSerializer, SocialPostSerializer, FriendRequestSerializer, 
    UserSerializer, RichPostSerializer
)
import os
from typing import Any
from rest_framework.request import Request
from .utils import resolve_coordinates, fetch_open_meteo_weather

class BaseToggleM2MView(APIView):
    """Classe de base générique pour basculer (toggle) des relations Many-to-Many."""
    permission_classes = [IsAuthenticated]
    model = None
    relation_name = None

    def post(self, request: Request, pk: int) -> Response:
        obj = get_object_or_404(self.model, pk=pk)
        relation = getattr(obj, self.relation_name)
        
        if relation.filter(id=request.user.id).exists():
            relation.remove(request.user)
            return self.get_response(obj, added=False)
        else:
            relation.add(request.user)
            return self.get_response(obj, added=True)

    def get_response(self, obj: Any, added: bool) -> Response:
        return Response({"active": added})
class MyProfileView(APIView):
    """Vue pour voir et modifier son propre profil."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def get(self, request: Request) -> Response:
        profile, _ = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)
    def patch(self, request: Request) -> Response:
        profile, _ = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class PublicProfileView(APIView):
    """Vue pour voir le profil d'un autre utilisateur."""
    permission_classes = [IsAuthenticated]
    def get(self, request: Request, username: str) -> Response:
        user = get_object_or_404(User, username=username)
        profile, _ = Profile.objects.get_or_create(user=user)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)
class SocialPostListCreateView(APIView):
    """Vue pour lister et créer des publications sociales."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def get(self, request: Request) -> Response:
        username = request.query_params.get('username')
        if username:
            posts = SocialPost.objects.filter(author__username=username)
        else:
            posts = SocialPost.objects.all()
        serializer = SocialPostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)
    def post(self, request: Request) -> Response:
        serializer = SocialPostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LikePostView(BaseToggleM2MView):
    """Vue pour liker/unliker une publication."""
    model = SocialPost
    relation_name = 'likes'

    def get_response(self, obj: SocialPost, added: bool) -> Response:
        return Response({'liked': added})
class UserListView(APIView):
    """Liste tous les utilisateurs sauf soi-même."""
    permission_classes = [IsAuthenticated]
    def get(self, request: Request) -> Response:
        users = User.objects.exclude(id=request.user.id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
class FriendRequestView(APIView):
    """Gère les demandes d'amis (envoi et liste)."""
    permission_classes = [IsAuthenticated]
    def get(self, request: Request) -> Response:
        requests = FriendRequest.objects.filter(to_user=request.user, accepted=False)
        serializer = FriendRequestSerializer(requests, many=True)
        return Response(serializer.data)
    def post(self, request: Request, user_id: int) -> Response:
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
    def post(self, request: Request, request_id: int) -> Response:
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


class RichPostListCreateView(APIView):
    """Vue pour lister et créer des publications riches avec multi-médias."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request: Request) -> Response:
        """Liste toutes les publications riches avec leurs pièces jointes."""
        posts = RichPost.objects.all().prefetch_related('attachments')
        serializer = RichPostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)

    def _create_attachments(self, rich_post: RichPost, request_data: Any, request_files: Any) -> None:
        """Crée des pièces jointes pour une publication riche et synchronise avec l'Album."""
        from photos.models import Photo
        index = 0
        while True:
            file_key = f'file_{index}'
            if file_key not in request_files:
                break
            uploaded_file = request_files[file_key]
            att_caption = request_data.get(f'caption_{index}') or ''
            att_location = request_data.get(f'location_{index}') or ''
            filename = uploaded_file.name
            ext = os.path.splitext(filename)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
                file_type = 'IMAGE'
            elif ext in ['.mp4', '.mov', '.avi', '.mkv', '.webm']:
                file_type = 'VIDEO'
            elif ext == '.pdf':
                file_type = 'PDF'
            else:
                file_type = 'OTHER'
            RichPostAttachment.objects.create(
                post=rich_post, file=uploaded_file, file_name=filename,
                file_type=file_type, caption=att_caption, location=att_location
            )
            if file_type == 'IMAGE':
                lat, lon = resolve_coordinates(att_location or rich_post.location)
                photo_title = att_caption or rich_post.title or f"Photo de {rich_post.author.username}"
                photo_obj = Photo.objects.create(
                    author=rich_post.author, titre=photo_title,
                    description=att_caption or rich_post.caption or "",
                    latitude=lat, longitude=lon
                )
                photo_obj.image.save(filename, uploaded_file, save=True)
            index += 1

    def post(self, request: Request) -> Response:
        """Crée une publication riche avec pièces jointes et synchro auto."""
        from cinema.models import Movie
        from django.utils import timezone
        title = request.data.get('title') or ''
        caption = request.data.get('caption') or ''
        loc = request.data.get('location') or ''
        
        event_date_str = request.data.get('event_date')
        event_time_str = request.data.get('event_time')
        event_date = None
        event_time = None
        weather_info = None
        
        if event_date_str:
            try:
                event_date = timezone.datetime.strptime(event_date_str, "%Y-%m-%d").date()
            except ValueError:
                pass
                
        if event_time_str:
            try:
                event_time = timezone.datetime.strptime(event_time_str, "%H:%M").time()
            except ValueError:
                try:
                    event_time = timezone.datetime.strptime(event_time_str, "%H:%M:%S").time()
                except ValueError:
                    pass
                    
        # Récupération de la météo historique réelle sur Open-Meteo
        if loc and event_date:
            lat, lon = resolve_coordinates(loc)
            if lat is not None and lon is not None:
                weather_info = fetch_open_meteo_weather(lat, lon, event_date, event_time)
                
        rich_post = RichPost.objects.create(
            author=request.user, title=title, caption=caption, location=loc,
            event_date=event_date, event_time=event_time, weather_info=weather_info
        )
        self._create_attachments(rich_post, request.data, request.FILES)

        # Détection de journée Cinéma
        text_search = (title + ' ' + caption).lower()
        is_cin = any(w in text_search for w in ['cinema', 'cinéma', 'film', 'movie']) or request.data.get('movie_title')
        if is_cin:
            lat, lon = resolve_coordinates(loc)
            Movie.objects.get_or_create(
                title=request.data.get('movie_title') or title or "Film du Journal",
                defaults={
                    "date_seen": timezone.now(), "location": loc, "latitude": lat, "longitude": lon, "added_by": request.user,
                    "antoine_review": "Via Journal 📖" if request.user.username == "antoine" else "", "antoine_rating": 4 if request.user.username == "antoine" else None,
                    "amani_review": "Via Journal 📖" if request.user.username == "amani" else "", "amani_rating": 4 if request.user.username == "amani" else None,
                }
            )
        profile, _ = Profile.objects.get_or_create(user=request.user)
        profile.points += 20
        profile.save(update_fields=['points'])
        serializer = RichPostSerializer(rich_post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RichPostLikeToggleView(BaseToggleM2MView):
    """Vue pour liker/unliker une publication riche."""
    model = RichPost
    relation_name = 'likes'

    def get_response(self, obj: RichPost, added: bool) -> Response:
        return Response({
            'status': 'liked' if added else 'unliked',
            'likes_count': obj.likes.count()
        })


class RichPostBookmarkToggleView(BaseToggleM2MView):
    """Vue pour ajouter/retirer une publication riche des favoris."""
    model = RichPost
    relation_name = 'bookmarks'

    def get_response(self, obj: RichPost, added: bool) -> Response:
        return Response({
            'status': 'bookmarked' if added else 'unbookmarked',
            'is_bookmarked': added
        })


class RichPostDetailView(APIView):
    """Vue pour récupérer, modifier ou supprimer une publication riche."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, pk: int) -> Response:
        post = get_object_or_404(RichPost, pk=pk)
        serializer = RichPostSerializer(post, context={'request': request})
        return Response(serializer.data)

    def patch(self, request: Request, pk: int) -> Response:
        post = get_object_or_404(RichPost, pk=pk)
        if post.author != request.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        allowed_fields = ['title', 'caption', 'location', 'event_date', 'event_time']
        update_data = {k: v for k, v in request.data.items() if k in allowed_fields}
        serializer = RichPostSerializer(post, data=update_data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int) -> Response:
        post = get_object_or_404(RichPost, pk=pk)
        if post.author != request.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LocationResolveView(APIView):
    """Vue pour résoudre les coordonnées GPS d'un lieu à la demande."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        query = request.query_params.get('query')
        if not query:
            return Response({'error': 'Query required'}, status=400)
        lat, lon = resolve_coordinates(query)
        if lat is not None and lon is not None:
            return Response({'latitude': lat, 'longitude': lon})
        return Response({'error': 'Location not found'}, status=404)




