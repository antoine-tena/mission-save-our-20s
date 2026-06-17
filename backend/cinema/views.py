import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from decouple import config
from .models import Movie
from .serializers import MovieSerializer
from agenda.models import Event
from rest_framework.request import Request
from typing import Any
from datetime import datetime

TMDB_API_KEY = config('TMDB_API_KEY', default='06e557b0259a1521943c6587ad6c898c')
TMDB_BASE_URL = "https://api.themoviedb.org/3"

class MovieTMDBSearchView(APIView):
    """Vue pour rechercher des films sur TMDB."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        query = request.query_params.get('query')
        if not query:
            return Response({'error': 'Query required'}, status=400)
        try:
            url = f"{TMDB_BASE_URL}/search/movie"
            params = {'api_key': TMDB_API_KEY, 'language': 'fr-FR', 'query': query}
            api_response = requests.get(url, params=params, timeout=10)
            api_response.raise_for_status()
            results = api_response.json().get('results', [])
            return Response([{"id": r.get('id'), "title": r.get('title'), "release_year": r.get('release_date', '')[:4], "poster_path": r.get('poster_path')} for r in results])
        except Exception as e:
            return Response({'error': str(e)}, status=502)

class MovieListCreateView(APIView):
    """Vue pour lister et créer des films."""
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request: Request) -> Response:
        movies = Movie.objects.all()
        return Response(MovieSerializer(movies, many=True, context={'request': request}).data)
    
    def post(self, request: Request) -> Response:
        tmdb_id = request.data.get('tmdb_id')
        if not tmdb_id:
            return Response({'error': 'tmdb_id is required'}, status=400)

        try:
            # Fetch TMDB Details
            m_res = requests.get(f"{TMDB_BASE_URL}/movie/{tmdb_id}", params={'api_key': TMDB_API_KEY, 'language': 'fr-FR'}, timeout=10)
            m_res.raise_for_status()
            m_data = m_res.json()

            # Fetch TMDB Credits
            c_res = requests.get(f"{TMDB_BASE_URL}/movie/{tmdb_id}/credits", params={'api_key': TMDB_API_KEY, 'language': 'fr-FR'}, timeout=10)
            c_res.raise_for_status()
            c_data = c_res.json()

            serializer = MovieSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                movie = serializer.save(
                    added_by=request.user,
                    title=m_data.get('title'),
                    overview=m_data.get('overview'),
                    runtime=m_data.get('runtime'),
                    genres=", ".join([g.get('name') for g in m_data.get('genres', [])]),
                    director=next((p.get('name') for p in c_data.get('crew', []) if p.get('job') == 'Director'), None),
                    cast=", ".join([p.get('name') for p in c_data.get('cast', [])[:5]])
                )

                if m_data.get('poster_path'):
                    p_res = requests.get(f"https://image.tmdb.org/t/p/original{m_data.get('poster_path')}", timeout=15)
                    if p_res.status_code == 200:
                        movie.poster.save(f"movie_{movie.id}.jpg", ContentFile(p_res.content), save=True)

                # Create Agenda Event
                try:
                    event_date = movie.date_seen
                    if isinstance(event_date, str):
                        event_date = datetime.fromisoformat(event_date.replace('Z', '+00:00'))
                    
                    Event.objects.create(
                        title=f"Séance Ciné : {movie.title}",
                        date=event_date.date(),
                        location=movie.location or "Cinéma",
                        description=f"Film vu au {movie.location or 'Cinéma'}.\nAntoine: {movie.antoine_rating}/5 | Amani: {movie.amani_rating}/5"
                    )
                except Exception as ex:
                    print(f"DEBUG ERROR creating event: {ex}")

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"DEBUG ERROR: {e}")
            return Response({'error': str(e)}, status=502)

class MovieDetailView(APIView):
    """Vue pour voir, modifier ou supprimer un film spécifique."""
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request: Request, pk: int) -> Response:
        movie = get_object_or_404(Movie, pk=pk)
        return Response(MovieSerializer(movie, context={'request': request}).data)

    def patch(self, request: Request, pk: int) -> Response:
        movie = get_object_or_404(Movie, pk=pk)
        serializer = MovieSerializer(movie, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int) -> Response:
        movie = get_object_or_404(Movie, pk=pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
