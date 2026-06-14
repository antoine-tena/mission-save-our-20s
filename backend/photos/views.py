from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Photo, Album, AlbumPage
from .serializers import PhotoSerializer, AlbumSerializer, AlbumPageSerializer
from rest_framework.request import Request
from typing import Any

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
        serializer = PhotoSerializer(unique_photos, many=True, context={'request': request})
        return Response(serializer.data)

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

class AlbumListCreateView(APIView):
    """Vue pour lister et créer des albums Cheerz-style."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request: Request) -> Response:
        albums = Album.objects.filter(user=request.user).prefetch_related('pages__photos')
        serializer = AlbumSerializer(albums, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = AlbumSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AlbumDetailDeleteUpdateView(APIView):
    """Vue pour lire, éditer (PATCH partial) ou supprimer un album."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_object(self, pk: int, user: Any) -> Album:
        return get_object_or_404(Album.objects.prefetch_related('pages__photos'), pk=pk, user=user)

    def get(self, request: Request, pk: int) -> Response:
        album = self.get_object(pk, request.user)
        serializer = AlbumSerializer(album, context={'request': request})
        return Response(serializer.data)

    def patch(self, request: Request, pk: int) -> Response:
        album = self.get_object(pk, request.user)
        if 'cover_photo_id' in request.data:
            photo_id = request.data.get('cover_photo_id')
            if photo_id is not None:
                photo = get_object_or_404(Photo, id=photo_id)
                album.cover_photo = photo.image
            else:
                album.cover_photo = None
            album.save(update_fields=['cover_photo'])
        if 'back_cover_photo_id' in request.data:
            photo_id = request.data.get('back_cover_photo_id')
            if photo_id is not None:
                photo = get_object_or_404(Photo, id=photo_id)
                album.back_cover_photo = photo.image
            else:
                album.back_cover_photo = None
            album.save(update_fields=['back_cover_photo'])
        serializer = AlbumSerializer(album, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int) -> Response:
        album = self.get_object(pk, request.user)
        album.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AlbumPageListCreateView(APIView):
    """Vue pour lister et créer des pages pour un album."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, album_id: int) -> Response:
        pages = AlbumPage.objects.filter(album__id=album_id, album__user=request.user).prefetch_related('photos')
        serializer = AlbumPageSerializer(pages, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request: Request, album_id: int) -> Response:
        album = get_object_or_404(Album, id=album_id, user=request.user)
        order = AlbumPage.objects.filter(album=album).count()
        
        # Alternating default layout grid-1 to grid-4
        default_layout = f"grid-{(order % 4) + 1}"
        data = request.data
        if hasattr(data, 'copy'):
            data = data.copy()
        else:
            data = dict(data)
            
        if 'layout_type' not in data or data.get('layout_type') in ['scrapbook', '']:
            data['layout_type'] = default_layout

        serializer = AlbumPageSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save(album=album, order=order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AlbumPageDetailDeleteUpdateView(APIView):
    """Vue pour éditer une page d'album (PATCH partial pour inline editing)."""
    permission_classes = [IsAuthenticated]

    def get_object(self, pk: int, user: Any) -> AlbumPage:
        return get_object_or_404(AlbumPage, pk=pk, album__user=user)

    def get(self, request: Request, pk: int) -> Response:
        page = self.get_object(pk, request.user)
        serializer = AlbumPageSerializer(page, context={'request': request})
        return Response(serializer.data)

    def patch(self, request: Request, pk: int) -> Response:
        page = self.get_object(pk, request.user)
        serializer = AlbumPageSerializer(page, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int) -> Response:
        page = self.get_object(pk, request.user)
        page.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AlbumPageReorderView(APIView):
    """Vue pour réordonner les pages de façon transactionnelle."""
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request: Request, album_id: int) -> Response:
        album = get_object_or_404(Album, id=album_id, user=request.user)
        page_ids = request.data.get('page_ids', [])
        if not isinstance(page_ids, list):
            return Response({'error': 'page_ids must be a list'}, status=status.HTTP_400_BAD_REQUEST)
        
        for idx, page_id in enumerate(page_ids):
            AlbumPage.objects.filter(id=page_id, album=album).update(order=idx)
            
        return Response({'status': 'reordered'})

class AlbumPhotoUploadView(APIView):
    """Zone de bulk upload asynchrone Cheerz-style."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request: Request, page_id: int) -> Response:
        page = get_object_or_404(AlbumPage, id=page_id, album__user=request.user)
        uploaded_file = request.FILES.get('image')
        if not uploaded_file:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        if uploaded_file.size > 10 * 1024 * 1024:
            return Response({'error': 'La taille dépasse 10MB'}, status=status.HTTP_400_BAD_REQUEST)
            
        if not uploaded_file.content_type.startswith('image/'):
            return Response({'error': 'Images uniquement'}, status=status.HTTP_400_BAD_REQUEST)

        order = Photo.objects.filter(page=page).count()
        photo = Photo.objects.create(
            author=request.user, page=page,
            titre=request.data.get('titre', uploaded_file.name),
            description=request.data.get('description', ''),
            caption=request.data.get('caption', ''),
            image=uploaded_file, order=order
        )
        photo.extract_gps()
        serializer = PhotoSerializer(photo, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AlbumAutoGenerateView(APIView):
    """Génère automatiquement des albums photo Cheerz-style groupés par mois."""
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request: Request) -> Response:
        from datetime import datetime
        photos = Photo.objects.filter(page__isnull=True).order_by('date_creation')
        if not photos.exists():
            return Response({'message': 'Aucune photo libre disponible.'}, status=status.HTTP_400_BAD_REQUEST)

        groups = {}
        for p in photos:
            groups.setdefault(p.date_creation.strftime('%Y-%m'), []).append(p)

        created_albums = []
        months_fr = {1: "Janvier", 2: "Février", 3: "Mars", 4: "Avril", 5: "Mai", 6: "Juin", 7: "Juillet", 8: "Août", 9: "Septembre", 10: "Octobre", 11: "Novembre", 12: "Décembre"}
        
        for key, plist in groups.items():
            dt = datetime.strptime(key, '%Y-%m')
            album = Album.objects.create(user=request.user, title=f"{months_fr[dt.month]} {dt.year}", description=f"Album mensuel de {len(plist)} souvenirs.")
            if plist:
                album.cover_photo = plist[0].image
                album.save(update_fields=['cover_photo'])

            for idx in range(0, len(plist), 3):
                chunk = plist[idx:idx+3]
                layout = 'mosaic' if len(chunk) == 3 else ('scrapbook' if len(chunk) == 2 else 'full')
                page = AlbumPage.objects.create(album=album, title=f"Souvenirs", layout_type=layout, order=idx//3)
                for s_idx, p in enumerate(chunk):
                    p.page = page
                    p.order = s_idx
                Photo.objects.bulk_update(chunk, ['page', 'order'])
            created_albums.append(album)

        serializer = AlbumSerializer(created_albums, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

