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
