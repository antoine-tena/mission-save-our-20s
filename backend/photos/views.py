from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Photo
from .serializers import PhotoListSerializer, PhotoDetailSerializer
from typing import Any

class PhotoListCreateView(APIView):
    """Vue pour lister et créer des photos."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request: Any) -> Response:
        photos = Photo.objects.all()
        serializer = PhotoListSerializer(photos, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request: Any) -> Response:
        serializer = PhotoDetailSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            photo = serializer.save(author=request.user)
            photo.extract_gps()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoDetailDeleteView(APIView):
    """Vue pour supprimer une photo spécifique."""
    permission_classes = [IsAuthenticated]

    def delete(self, request: Any, pk: int) -> Response:
        photo = get_object_or_404(Photo, pk=pk)
        
        # Vérification des droits : auteur ou staff
        if photo.author and photo.author != request.user and not request.user.is_staff:
            return Response(
                {'error': 'Vous n\'avez pas la permission de supprimer cette photo.'}, 
                status=status.HTTP_403_FORBIDDEN
            )

        photo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PhotoMemoriesView(APIView):
    """Vue pour récupérer les souvenirs (Flashback)."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Any) -> Response:
        today = timezone.now()
        memories = Photo.objects.filter(
            date_creation__month=today.month,
            date_creation__day=today.day
        ).exclude(date_creation__year=today.year)
        
        if not memories.exists():
            memories = Photo.objects.filter(
                date_creation__month=today.month
            ).exclude(date_creation__year=today.year).order_by('?')[:5]

        serializer = PhotoListSerializer(memories, many=True, context={'request': request})
        return Response(serializer.data)

class HealthCheckView(APIView):
    """Endpoint simple pour le health check Docker."""
    permission_classes = [AllowAny]

    def get(self, request: Any) -> Response:
        return Response({"status": "ok"}, status=status.HTTP_200_OK)
