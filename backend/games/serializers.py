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
