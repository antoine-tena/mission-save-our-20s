## Arborescence
```text
📁 backend/
    📄 Dockerfile
    📄 README.md
    📄 manage.py
    📄 requirements.txt
    📁 agenda/
        📄 __init__.py
        📄 admin.py
        📄 apps.py
        📄 models.py
        📄 serializers.py
        📄 tests.py
        📄 views.py
        📁 management/
            📁 commands/
        📁 migrations/
            📄 0001_initial.py
            📄 __init__.py
    📁 backend/
    📁 cinema/
        📄 __init__.py
        📄 admin.py
        📄 apps.py
        📄 models.py
        📄 serializers.py
        📄 tests.py
        📄 views.py
        📁 migrations/
            📄 0001_initial.py
            📄 __init__.py
    📁 core/
        📄 __init__.py
        📄 asgi.py
        📄 auth_views.py
        📄 middleware.py
        📄 settings.py
        📄 urls.py
        📄 wsgi.py
    📁 games/
        📄 __init__.py
        📄 admin.py
        📄 apps.py
        📄 models.py
        📄 serializers.py
        📄 tests.py
        📄 views.py
        📁 migrations/
            📄 0001_initial.py
            📄 __init__.py
    📁 media/
        📁 avatars/
            📁 1/
        📁 covers/
            📁 1/
        📁 photos/
            📁 2026/
                📁 06/
                    📁 05/
                    📁 07/
        📁 social_posts/
            📁 3/
    📁 photos/
        📄 __init__.py
        📄 admin.py
        📄 models.py
        📄 serializers.py
        📄 urls.py
        📄 views.py
        📁 migrations/
            📄 0001_initial.py
            📄 0002_photo_author.py
            📄 0003_photo_latitude_photo_longitude.py
            📄 __init__.py
    📁 social/
        📄 __init__.py
        📄 admin.py
        📄 apps.py
        📄 models.py
        📄 serializers.py
        📄 tests.py
        📄 views.py
        📁 migrations/
            📄 0001_initial.py
            📄 0002_profile_cover_image_profile_points_profile_status.py
            📄 __init__.py
    📁 stars/
        📄 __init__.py
        📄 admin.py
        📄 apps.py
        📄 models.py
        📄 serializers.py
        📄 tests.py
        📄 views.py
        📁 migrations/
            📄 0001_initial.py
            📄 __init__.py
    📁 wishlist/
        📄 __init__.py
        📄 admin.py
        📄 apps.py
        📄 models.py
        📄 serializers.py
        📄 tests.py
        📄 views.py
        📁 management/
            📁 commands/
                📄 seed_wishlist.py
        📁 migrations/
            📄 0001_initial.py
            📄 __init__.py
```

## Contenu des fichiers


---
### Fichier : backend\Dockerfile
```text
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

```


---
### Fichier : backend\README.md
```text

```


---
### Fichier : backend\manage.py
```text
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

```


---
### Fichier : backend\requirements.txt
```text
asgiref==3.8.1
Django==5.0.4
sqlparse==0.5.0
djangorestframework==3.15.1
django-cors-headers==4.3.1
python-decouple==3.8
Pillow==12.2.0

```


---
### Fichier : backend\agenda\__init__.py
```text

```


---
### Fichier : backend\agenda\admin.py
```text
from django.contrib import admin

# Register your models here.

```


---
### Fichier : backend\agenda\apps.py
```text
from django.apps import AppConfig


class AgendaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'agenda'

```


---
### Fichier : backend\agenda\models.py
```text
from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} - {self.date}"

```


---
### Fichier : backend\agenda\serializers.py
```text
from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

```


---
### Fichier : backend\agenda\tests.py
```text
from django.test import TestCase

# Create your tests here.

```


---
### Fichier : backend\agenda\views.py
```text
from rest_framework import viewsets, permissions
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

```


---
### Fichier : backend\agenda\migrations\0001_initial.py
```text
# Generated by Django 5.0.4 on 2026-06-06 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('description', models.TextField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
    ]

```


---
### Fichier : backend\agenda\migrations\__init__.py
```text

```


---
### Fichier : backend\cinema\__init__.py
```text

```


---
### Fichier : backend\cinema\admin.py
```text
from django.contrib import admin
from .models import Movie

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_seen', 'antoine_rating', 'amani_rating')
    list_filter = ('date_seen', 'added_by')
    search_fields = ('title', 'antoine_review', 'amani_review')

```


---
### Fichier : backend\cinema\apps.py
```text
from django.apps import AppConfig


class CinemaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cinema'

```


---
### Fichier : backend\cinema\models.py
```text
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import os
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from django.db.models import Manager

def movie_poster_path(movie_instance: 'Movie', filename: str) -> str:
    """Génère le chemin d'upload pour l'affiche du film."""
    return os.path.join('movies', str(movie_instance.date_seen.year), filename)

class Movie(models.Model):
    title = models.CharField(max_length=255)
    poster = models.ImageField(upload_to=movie_poster_path, null=True, blank=True)
    date_seen = models.DateField()
    
    # Antoine's Perspective
    antoine_review = models.TextField(blank=True)
    antoine_rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        null=True, blank=True
    )
    
    # Amani's Perspective
    amani_review = models.TextField(blank=True)
    amani_rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        null=True, blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='added_movies')

    class Meta:
        ordering = ['-date_seen']
        verbose_name = "Film"
        verbose_name_plural = "Films"

    def __str__(self) -> str:
        return self.title

```


---
### Fichier : backend\cinema\serializers.py
```text
from rest_framework import serializers
from .models import Movie
from typing import Optional

class MovieSerializer(serializers.ModelSerializer):
    poster_url = serializers.SerializerMethodField()
    added_by_username = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'poster', 'poster_url', 'date_seen',
            'antoine_review', 'antoine_rating',
            'amani_review', 'amani_rating',
            'created_at', 'added_by_username'
        ]
        extra_kwargs = {
            'poster': {'write_only': True}
        }

    def get_poster_url(self, obj: Movie) -> Optional[str]:
        request = self.context.get('request')
        if obj.poster and request:
            return request.build_absolute_uri(obj.poster.url)
        return None

```


---
### Fichier : backend\cinema\tests.py
```text
from django.test import TestCase

# Create your tests here.

```


---
### Fichier : backend\cinema\views.py
```text
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Movie
from .serializers import MovieSerializer
from typing import Any

class MovieListCreateView(APIView):
    """Vue pour lister et ajouter des films visionnés."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request: Any) -> Response:
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True, context={'request': request})
        return Response(serializer.data)
    
    def post(self, request: Any) -> Response:
        serializer = MovieSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(added_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MovieDetailView(APIView):
    """Vue pour voir, modifier ou supprimer un film spécifique."""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request: Any, pk: int) -> Response:
        movie = get_object_or_404(Movie, pk=pk)
        serializer = MovieSerializer(movie, context={'request': request})
        return Response(serializer.data)

    def patch(self, request: Any, pk: int) -> Response:
        movie = get_object_or_404(Movie, pk=pk)
        serializer = MovieSerializer(movie, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Any, pk: int) -> Response:
        movie = get_object_or_404(Movie, pk=pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

```


---
### Fichier : backend\cinema\migrations\0001_initial.py
```text
# Generated by Django 5.0.4 on 2026-06-06 00:09

import cinema.models
import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('poster', models.ImageField(blank=True, null=True, upload_to=cinema.models.movie_poster_path)),
                ('date_seen', models.DateField()),
                ('antoine_review', models.TextField(blank=True)),
                ('antoine_rating', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('amani_review', models.TextField(blank=True)),
                ('amani_rating', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('added_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='added_movies', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date_seen'],
            },
        ),
    ]

```


---
### Fichier : backend\cinema\migrations\__init__.py
```text

```


---
### Fichier : backend\core\__init__.py
```text

```


---
### Fichier : backend\core\asgi.py
```text
"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_asgi_application()

```


---
### Fichier : backend\core\auth_views.py
```text
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

@api_view(['GET'])
@permission_classes([AllowAny])
def root_view(request):
    return Response({"message": "API Mission Save Our 20s"})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })

```


---
### Fichier : backend\core\middleware.py
```text
class RequestLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(f"DEBUG: Request {request.method} {request.path}")
        response = self.get_response(request)
        print(f"DEBUG: Response {response.status_code}")
        return response

```


---
### Fichier : backend\core\settings.py
```text
from pathlib import Path
from decouple import config, Csv
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='django-insecure-replace-me')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = ['*']

# Application definition
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
]

LOCAL_APPS = [
    'photos',
    'social',
    'cinema',
    'games',
    'wishlist',
    'agenda',
    'stars',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'core.middleware.RequestLogMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Europe/Paris'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = 'media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
    ]
}

```


---
### Fichier : backend\core\urls.py
```text
"""
URL configuration for core project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from photos.views import (
    PhotoListCreateView, PhotoDetailDeleteView, 
    PhotoMemoriesView, HealthCheckView
)
from . import auth_views
from cinema.views import MovieListCreateView, MovieDetailView
from games.views import GameTypeListView, GameSessionListCreateView, ScoreboardStatsView
from social.views import (
    MyProfileView, PublicProfileView, SocialPostListCreateView,
    LikePostView, UserListView, FriendRequestView, HandleFriendRequestView
)
from rest_framework.routers import DefaultRouter
from wishlist.views import WishlistItemViewSet
from agenda.views import EventViewSet
from stars.views import StargazingSpotViewSet

router = DefaultRouter()
router.register(r'wishlist', WishlistItemViewSet, basename='wishlist')
router.register(r'agenda', EventViewSet, basename='agenda')
router.register(r'stargazing', StargazingSpotViewSet, basename='stargazing')

urlpatterns = [
    path('', auth_views.root_view),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/register/', auth_views.register),
    path('api/auth/login/', auth_views.login),
    path('api/auth/logout/', auth_views.logout),
    path('api/auth/me/', auth_views.get_user),
    path('api/photos/', PhotoListCreateView.as_view()),
    path('api/photos/memories/', PhotoMemoriesView.as_view()),
    path('api/photos/<int:pk>/', PhotoDetailDeleteView.as_view()),
    path('api/health/', HealthCheckView.as_view()),

    # Social
    path('api/social/profile/', MyProfileView.as_view()),
    path('api/social/profile/<str:username>/', PublicProfileView.as_view()),
    path('api/social/posts/', SocialPostListCreateView.as_view()),
    path('api/social/posts/<int:pk>/like/', LikePostView.as_view()),
    path('api/social/users/', UserListView.as_view()),
    path('api/social/friends/requests/', FriendRequestView.as_view()),
    path('api/social/friends/requests/send/<int:user_id>/', FriendRequestView.as_view()),
    path('api/social/friends/requests/<int:request_id>/', HandleFriendRequestView.as_view()),

    # Cinema
    path('api/cinema/movies/', MovieListCreateView.as_view()),
    path('api/cinema/movies/<int:pk>/', MovieDetailView.as_view()),

    # Games
    path('api/games/types/', GameTypeListView.as_view()),
    path('api/games/sessions/', GameSessionListCreateView.as_view()),
    path('api/games/stats/', ScoreboardStatsView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

```


---
### Fichier : backend\core\wsgi.py
```text
"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()

```


---
### Fichier : backend\games\__init__.py
```text

```


---
### Fichier : backend\games\admin.py
```text
from django.contrib import admin
from .models import GameType, GameSession

@admin.register(GameType)
class GameTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon')

@admin.register(GameSession)
class GameSessionAdmin(admin.ModelAdmin):
    list_display = ('game_type', 'date', 'amani_score', 'antoine_score', 'winner')
    list_filter = ('game_type', 'date')
    search_fields = ('location', 'notes')

```


---
### Fichier : backend\games\apps.py
```text
from django.apps import AppConfig


class GamesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'games'

```


---
### Fichier : backend\games\models.py
```text
from django.db import models
from django.contrib.auth.models import User
from typing import Text

class GameType(models.Model):
    name = models.CharField(max_length=100) # e.g., Billard, Bowling
    icon = models.CharField(max_length=10, default="🎮")

    def __str__(self) -> str:
        return self.name

class GameSession(models.Model):
    game_type = models.ForeignKey(GameType, on_delete=models.CASCADE, related_name='sessions')
    date = models.DateField()
    
    # Specific fields for Amani and Antoine as requested
    amani_score = models.IntegerField(default=0)
    antoine_score = models.IntegerField(default=0)
    
    location = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = "Session de Jeu"
        verbose_name_plural = "Sessions de Jeu"

    @property
    def winner(self) -> Text:
        if self.amani_score > self.antoine_score:
            return "Amani"
        if self.antoine_score > self.amani_score:
            return "Antoine"
        return "Égalité"

    def __str__(self) -> str:
        return f"{self.game_type.name} ({self.date}) - Vainqueur: {self.winner}"

```


---
### Fichier : backend\games\serializers.py
```text
from rest_framework import serializers
from .models import GameType, GameSession

class GameTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameType
        fields = ['id', 'name', 'icon']

class GameSessionSerializer(serializers.ModelSerializer):
    game_type_name = serializers.ReadOnlyField(source='game_type.name')
    game_type_icon = serializers.ReadOnlyField(source='game_type.icon')
    winner = serializers.ReadOnlyField()

    class Meta:
        model = GameSession
        fields = [
            'id', 'game_type', 'game_type_name', 'game_type_icon',
            'date', 'amani_score', 'antoine_score', 'location', 'notes',
            'winner', 'created_at'
        ]

```


---
### Fichier : backend\games\tests.py
```text
from django.test import TestCase

# Create your tests here.

```


---
### Fichier : backend\games\views.py
```text
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import GameType, GameSession
from .serializers import GameTypeSerializer, GameSessionSerializer
from django.db.models import F
from typing import Any, List, Dict

class GameTypeListView(APIView):
    """Liste les types de jeux disponibles."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Any) -> Response:
        types = GameType.objects.all()
        serializer = GameTypeSerializer(types, many=True)
        return Response(serializer.data)

class GameSessionListCreateView(APIView):
    """Liste et crée des sessions de jeu."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Any) -> Response:
        sessions = GameSession.objects.all()
        serializer = GameSessionSerializer(sessions, many=True)
        return Response(serializer.data)
    
    def post(self, request: Any) -> Response:
        serializer = GameSessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScoreboardStatsView(APIView):
    """Calcule les statistiques globales du scoreboard."""
    permission_classes = [IsAuthenticated]

    def get(self, request: Any) -> Response:
        amani_wins = GameSession.objects.filter(amani_score__gt=F('antoine_score')).count()
        antoine_wins = GameSession.objects.filter(antoine_score__gt=F('amani_score')).count()
        draws = GameSession.objects.filter(amani_score=F('antoine_score')).count()
        
        stats_by_game: List[Dict[str, Any]] = []
        for gtype in GameType.objects.all():
            sessions = GameSession.objects.filter(game_type=gtype)
            a_wins = sessions.filter(amani_score__gt=F('antoine_score')).count()
            ant_wins = sessions.filter(antoine_score__gt=F('amani_score')).count()
            stats_by_game.append({
                'game_type': gtype.name,
                'icon': gtype.icon,
                'amani_wins': a_wins,
                'antoine_wins': ant_wins,
                'total': sessions.count()
            })

        return Response({
            'overall': {
                'amani_wins': amani_wins,
                'antoine_wins': antoine_wins,
                'draws': draws
            },
            'by_game': stats_by_game
        })

```


---
### Fichier : backend\games\migrations\0001_initial.py
```text
# Generated by Django 5.0.4 on 2026-06-06 00:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GameType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('icon', models.CharField(default='🎮', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='GameSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('amani_score', models.IntegerField(default=0)),
                ('antoine_score', models.IntegerField(default=0)),
                ('location', models.CharField(blank=True, max_length=255)),
                ('notes', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('game_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sessions', to='games.gametype')),
            ],
            options={
                'ordering': ['-date', '-created_at'],
            },
        ),
    ]

```


---
### Fichier : backend\games\migrations\__init__.py
```text

```


---
### Fichier : backend\photos\__init__.py
```text

```


---
### Fichier : backend\photos\admin.py
```text
from django.contrib import admin
from django.utils.html import format_html
from .models import Photo

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('titre', 'apercu', 'date_creation')
    list_filter = ('date_creation',)
    search_fields = ('titre', 'description')
    readonly_fields = ('apercu_detail',)

    fieldsets = (
        (None, {
            'fields': ('titre', 'description')
        }),
        ('Fichier', {
            'fields': ('image', 'apercu_detail')
        }),
        ('Métadonnées', {
            'fields': ('date_creation',),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('date_creation', 'apercu_detail')

    def apercu(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 50px; height: auto; border-radius: 4px;" />', obj.image.url)
        return "Aucun aperçu"
    apercu.short_description = 'Aperçu'

    def apercu_detail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-width: 300px; height: auto; border-radius: 8px;" />', obj.image.url)
        return "Aucun aperçu"
    apercu_detail.short_description = 'Aperçu de l\'image'

```


---
### Fichier : backend\photos\models.py
```text
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import os
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from typing import Optional, Tuple

def photo_upload_path(instance: 'Photo', filename: str) -> str:
    """Génère le chemin d'upload basé sur la date du jour."""
    now = datetime.now()
    return os.path.join(
        'photos',
        now.strftime('%Y'),
        now.strftime('%m'),
        now.strftime('%d'),
        filename
    )

class Photo(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='photos', null=True, blank=True)
    titre = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to=photo_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])]
    )
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_creation']
        verbose_name = "Photo"
        verbose_name_plural = "Photos"

    def __str__(self) -> str:
        return self.titre

    def _get_gps_info(self, exif_data: dict) -> dict:
        """Filtre et décode les tags GPS de l'EXIF."""
        gps_info = {}
        for tag, value in exif_data.items():
            decoded = TAGS.get(tag, tag)
            if decoded == "GPSInfo":
                for t in value:
                    sub_decoded = GPSTAGS.get(t, t)
                    gps_info[sub_decoded] = value[t]
        return gps_info

    def _convert_to_degrees(self, value) -> float:
        """Convertit les tuples EXIF en degrés décimaux."""
        d = float(value[0])
        m = float(value[1])
        s = float(value[2])
        return d + (m / 60.0) + (s / 3600.0)

    def extract_gps(self) -> None:
        """Extrait les coordonnées GPS des données EXIF de l'image."""
        if not self.image:
            return

        try:
            img = Image.open(self.image.path)
            exif_data = img._getexif()
            if not exif_data:
                return

            gps_info = self._get_gps_info(exif_data)
            if not gps_info:
                return

            lat = self._convert_to_degrees(gps_info['GPSLatitude'])
            if gps_info['GPSLatitudeRef'] != "N":
                lat = -lat

            lon = self._convert_to_degrees(gps_info['GPSLongitude'])
            if gps_info['GPSLongitudeRef'] != "E":
                lon = -lon

            self.latitude, self.longitude = lat, lon
            self.save(update_fields=['latitude', 'longitude'])
        except Exception as exc:
            print(f"DEBUG: EXIF Extraction failed for {self.id}: {exc}")

```


---
### Fichier : backend\photos\serializers.py
```text
from rest_framework import serializers
from .models import Photo
from typing import Optional

class PhotoListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Photo
        fields = [
            'id', 'author_name', 'titre', 'description', 
            'image_url', 'latitude', 'longitude', 'date_creation'
        ]

    def get_image_url(self, obj: Photo) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class PhotoDetailSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Photo
        fields = [
            'id', 'author', 'author_name', 'titre', 'description', 
            'image', 'image_url', 'latitude', 'longitude', 'date_creation'
        ]
        extra_kwargs = {
            'image': {'write_only': True}
        }
    
    def get_image_url(self, obj: Photo) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

```


---
### Fichier : backend\photos\urls.py
```text
from django.urls import path
from . import views

urlpatterns = [
    path('', views.photo_list_create, name='photo-list-create'),
    path('<int:pk>/', views.photo_detail_delete, name='photo-detail-delete'),
    path('health/', views.health_check, name='health-check'),
]

```


---
### Fichier : backend\photos\views.py
```text
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

```


---
### Fichier : backend\photos\migrations\0001_initial.py
```text
# Generated by Django 6.0.5 on 2026-06-04 22:37

import django.core.validators
import photos.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(upload_to=photos.models.photo_upload_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])])),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Photo',
                'verbose_name_plural': 'Photos',
                'ordering': ['-date_creation'],
            },
        ),
    ]

```


---
### Fichier : backend\photos\migrations\0002_photo_author.py
```text
# Generated by Django 5.0.4 on 2026-06-05 23:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='photos', to=settings.AUTH_USER_MODEL),
        ),
    ]

```


---
### Fichier : backend\photos\migrations\0003_photo_latitude_photo_longitude.py
```text
# Generated by Django 5.0.4 on 2026-06-06 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_photo_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='photo',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]

```


---
### Fichier : backend\photos\migrations\__init__.py
```text

```


---
### Fichier : backend\social\__init__.py
```text

```


---
### Fichier : backend\social\admin.py
```text
from django.contrib import admin
from .models import Profile, SocialPost, FriendRequest

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'friends_count')
    search_fields = ('user__username', 'bio')

    def friends_count(self, obj):
        return obj.friends.count()

@admin.register(SocialPost)
class SocialPostAdmin(admin.ModelAdmin):
    list_display = ('author', 'created_at', 'likes_count')
    list_filter = ('created_at', 'author')
    
    def likes_count(self, obj):
        return obj.likes.count()

@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('from_user', 'to_user', 'created_at', 'accepted')
    list_filter = ('accepted', 'created_at')

```


---
### Fichier : backend\social\apps.py
```text
from django.apps import AppConfig


class SocialConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'social'

```


---
### Fichier : backend\social\models.py
```text
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
import os
from typing import Any

def avatar_upload_path(profile_instance: 'Profile', filename: str) -> str:
    """Chemin d'upload pour l'avatar."""
    return os.path.join('avatars', str(profile_instance.user.id), filename)

def cover_upload_path(profile_instance: 'Profile', filename: str) -> str:
    """Chemin d'upload pour la photo de couverture."""
    return os.path.join('covers', str(profile_instance.user.id), filename)

def social_post_upload_path(post_instance: 'SocialPost', filename: str) -> str:
    """Chemin d'upload pour les images de publications sociales."""
    return os.path.join('social_posts', str(post_instance.author.id), filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    status = models.CharField(max_length=100, blank=True, default="En mission...")
    avatar = models.ImageField(
        upload_to=avatar_upload_path,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])]
    )
    cover_image = models.ImageField(
        upload_to=cover_upload_path,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])]
    )
    friends = models.ManyToManyField('self', symmetrical=True, blank=True)
    points = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Profil"
        verbose_name_plural = "Profils"

    def __str__(self) -> str:
        return f"Profil de {self.user.username}"

@receiver(post_save, sender=User)
def create_user_profile(sender: Any, instance: User, created: bool, **kwargs: Any) -> None:
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender: Any, instance: User, **kwargs: Any) -> None:
    if hasattr(instance, 'profile'):
        instance.profile.save()

class SocialPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='social_posts')
    image = models.ImageField(
        upload_to=social_post_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])]
    )
    caption = models.TextField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Publication Sociale"
        verbose_name_plural = "Publications Sociales"

    def __str__(self) -> str:
        return f"Post de {self.author.username} ({self.created_at})"

    def save(self, *args: Any, **kwargs: Any) -> None:
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            profile, _ = Profile.objects.get_or_create(user=self.author)
            profile.points += 10
            profile.save(update_fields=['points'])

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_friend_requests')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_friend_requests')
    created_at = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)

    class Meta:
        unique_together = ('from_user', 'to_user')
        verbose_name = "Demande d'ami"
        verbose_name_plural = "Demandes d'ami"

    def __str__(self) -> str:
        return f"Demande d'ami de {self.from_user.username} à {self.to_user.username}"

```


---
### Fichier : backend\social\serializers.py
```text
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

```


---
### Fichier : backend\social\tests.py
```text
from django.test import TestCase

# Create your tests here.

```


---
### Fichier : backend\social\views.py
```text
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

```


---
### Fichier : backend\social\migrations\0001_initial.py
```text
# Generated by Django 5.0.4 on 2026-06-05 23:29

import django.core.validators
import django.db.models.deletion
import social.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(blank=True, max_length=500)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=social.models.avatar_upload_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])])),
                ('friends', models.ManyToManyField(blank=True, to='social.profile')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SocialPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=social.models.social_post_upload_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])])),
                ('caption', models.TextField(blank=True, max_length=1000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='social_posts', to=settings.AUTH_USER_MODEL)),
                ('likes', models.ManyToManyField(blank=True, related_name='liked_posts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='FriendRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('accepted', models.BooleanField(default=False)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_friend_requests', to=settings.AUTH_USER_MODEL)),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_friend_requests', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('from_user', 'to_user')},
            },
        ),
    ]

```


---
### Fichier : backend\social\migrations\0002_profile_cover_image_profile_points_profile_status.py
```text
# Generated by Django 5.0.4 on 2026-06-05 23:44

import django.core.validators
import social.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to=social.models.cover_upload_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])]),
        ),
        migrations.AddField(
            model_name='profile',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='profile',
            name='status',
            field=models.CharField(blank=True, default='En mission...', max_length=100),
        ),
    ]

```


---
### Fichier : backend\social\migrations\__init__.py
```text

```


---
### Fichier : backend\stars\__init__.py
```text

```


---
### Fichier : backend\stars\admin.py
```text
from django.contrib import admin

# Register your models here.

```


---
### Fichier : backend\stars\apps.py
```text
from django.apps import AppConfig


class StarsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'stars'

```


---
### Fichier : backend\stars\models.py
```text
from django.db import models

class StargazingSpot(models.Model):
    name = models.CharField(max_length=255) # e.g., Bivouac Aravis
    latitude = models.FloatField()
    longitude = models.FloatField()
    date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

```


---
### Fichier : backend\stars\serializers.py
```text
from rest_framework import serializers
from .models import StargazingSpot

class StargazingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = StargazingSpot
        fields = '__all__'

```


---
### Fichier : backend\stars\tests.py
```text
from django.test import TestCase

# Create your tests here.

```


---
### Fichier : backend\stars\views.py
```text
from rest_framework import viewsets, permissions
from .models import StargazingSpot
from .serializers import StargazingSpotSerializer

class StargazingSpotViewSet(viewsets.ModelViewSet):
    queryset = StargazingSpot.objects.all()
    serializer_class = StargazingSpotSerializer
    permission_classes = [permissions.IsAuthenticated]

```


---
### Fichier : backend\stars\migrations\0001_initial.py
```text
# Generated by Django 5.0.4 on 2026-06-06 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StargazingSpot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('date', models.DateField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

```


---
### Fichier : backend\stars\migrations\__init__.py
```text

```


---
### Fichier : backend\wishlist\__init__.py
```text

```


---
### Fichier : backend\wishlist\admin.py
```text
from django.contrib import admin

# Register your models here.

```


---
### Fichier : backend\wishlist\apps.py
```text
from django.apps import AppConfig


class WishlistConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'wishlist'

```


---
### Fichier : backend\wishlist\models.py
```text
from django.db import models

class WishlistItem(models.Model):
    STATUS_CHOICES = [
        ('IDEA', 'Idée'),
        ('IN_PROGRESS', 'En cours'),
        ('DONE', 'Réalisé'),
    ]
    INITIATOR_CHOICES = [
        ('ANTOINE', 'Antoine'),
        ('AMANI', 'Amani'),
        ('BOTH', 'Ensemble'),
    ]
    
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='IDEA')
    initiator = models.CharField(max_length=20, choices=INITIATOR_CHOICES, default='BOTH')
    link = models.URLField(max_length=500, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_favorite', '-created_at']

    def __str__(self):
        return self.title

```


---
### Fichier : backend\wishlist\serializers.py
```text
from rest_framework import serializers
from .models import WishlistItem

class WishlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishlistItem
        fields = '__all__'

```


---
### Fichier : backend\wishlist\tests.py
```text
from django.test import TestCase

# Create your tests here.

```


---
### Fichier : backend\wishlist\views.py
```text
from rest_framework import viewsets, permissions
from .models import WishlistItem
from .serializers import WishlistItemSerializer

class WishlistItemViewSet(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer
    permission_classes = [permissions.IsAuthenticated]

```


---
### Fichier : backend\wishlist\management\commands\seed_wishlist.py
```text
from django.core.management.base import BaseCommand
from wishlist.models import WishlistItem

class Command(BaseCommand):
    help = 'Seeds the wishlist with initial examples'

    def handle(self, *args, **options):
        items = [
            {'title': 'Bivouac au Semnoz', 'status': 'DONE', 'initiator': 'BOTH', 'is_favorite': True},
            {'title': 'Voyage au Japon', 'status': 'IDEA', 'initiator': 'BOTH', 'is_favorite': True, 'price': 3000},
            {'title': 'Cours de danse', 'status': 'IN_PROGRESS', 'initiator': 'AMANI', 'is_favorite': False},
            {'title': 'Monter à l\'Aiguille du Midi', 'status': 'IDEA', 'initiator': 'ANTOINE', 'is_favorite': False},
        ]
        for item in items:
            WishlistItem.objects.get_or_create(**item)
        self.stdout.write(self.style.SUCCESS('Successfully seeded wishlist'))

```


---
### Fichier : backend\wishlist\migrations\0001_initial.py
```text
# Generated by Django 5.0.4 on 2026-06-06 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WishlistItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('IDEA', 'Idée'), ('IN_PROGRESS', 'En cours'), ('DONE', 'Réalisé')], default='IDEA', max_length=20)),
                ('initiator', models.CharField(choices=[('ANTOINE', 'Antoine'), ('AMANI', 'Amani'), ('BOTH', 'Ensemble')], default='BOTH', max_length=20)),
                ('link', models.URLField(blank=True, max_length=500, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('is_favorite', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-is_favorite', '-created_at'],
            },
        ),
    ]

```


---
### Fichier : backend\wishlist\migrations\__init__.py
```text

```
