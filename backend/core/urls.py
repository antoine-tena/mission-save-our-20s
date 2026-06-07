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
from cinema.views import MovieListCreateView, MovieDetailView, MovieTMDBSearchView
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
    path('admin/', admin.site.urls),
    
    # Auth routes
    path('api/auth/register/', auth_views.register),
    path('api/auth/login/', auth_views.login),
    path('api/auth/logout/', auth_views.logout),
    path('api/auth/me/', auth_views.get_user),
    
    # App-specific routes
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
    path('api/cinema/search/', MovieTMDBSearchView.as_view()),

    # Games
    path('api/games/types/', GameTypeListView.as_view()),
    path('api/games/sessions/', GameSessionListCreateView.as_view()),
    path('api/games/stats/', ScoreboardStatsView.as_view()),

    # Router
    path('api/', include(router.urls)),

    # Root
    path('', auth_views.root_view),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
