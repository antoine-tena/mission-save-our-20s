from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Photo
from .serializers import PhotoSerializer
from rest_framework.request import Request
from rest_framework.pagination import PageNumberPagination

class PhotoListCreateView(APIView):
    """Vue rétrocompatible pour lister et créer des photos."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request: Request) -> Response:
        photos = Photo.objects.filter(page__isnull=True).select_related('author')
        seen_images = set()
        unique_photos = []
        for p in photos:
            if p.image.name not in seen_images:
                seen_images.add(p.image.name)
                unique_photos.append(p)
                
        paginator = PageNumberPagination()
        paginator.page_size = 50
        result_page = paginator.paginate_queryset(unique_photos, request)
        serializer = PhotoSerializer(result_page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = PhotoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            photo = serializer.save(author=request.user)
            photo.extract_gps()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request) -> Response:
        Photo.objects.filter(page__isnull=True).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PhotoDetailDeleteView(APIView):
    """Vue pour supprimer ou modifier une photo spécifique."""
    permission_classes = [IsAuthenticated]

    def delete(self, request: Request, pk: int) -> Response:
        photo = get_object_or_404(Photo, pk=pk)
        Photo.objects.filter(image=photo.image).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request: Request, pk: int) -> Response:
        photo = get_object_or_404(Photo, pk=pk)
        if request.data.get('duplicate') is True:
            duplicate_photo = Photo.objects.create(
                author=photo.author,
                page_id=request.data.get('page'),
                titre=photo.titre,
                description=photo.description,
                caption=photo.caption,
                image=photo.image,
                latitude=photo.latitude,
                longitude=photo.longitude,
                order=request.data.get('order', 0)
            )
            serializer = PhotoSerializer(duplicate_photo, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        if 'page' in request.data and request.data.get('page') is None:
            other_photos = Photo.objects.filter(image=photo.image).exclude(pk=photo.pk)
            if other_photos.exists():
                photo.delete()
                return Response({'status': 'deleted_duplicate', 'id': pk}, status=status.HTTP_200_OK)

        serializer = PhotoSerializer(photo, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoMemoriesView(APIView):
    """Vue pour récupérer d'anciens souvenirs."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        memories = Photo.objects.order_by('?')[:4]
        serializer = PhotoSerializer(memories, many=True, context={'request': request})
        return Response(serializer.data)

class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    def get(self, request: Request) -> Response:
        return Response({"status": "ok"}, status=status.HTTP_200_OK)
