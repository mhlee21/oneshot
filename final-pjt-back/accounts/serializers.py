from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.serailizers import MovieSerializer
from .models import User
from shots.serializers.shot import ShotSerializer
from movies.serailizers import StarSerializer, MovieSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username')


class UserStarSerializer(serializers.ModelSerializer):
    starrating_set = StarSerializer(read_only=True, many=True)
    class Meta:
        model = User
        fields = ('pk', 'username', 'starrating_set')


class ProfileSerializer(serializers.ModelSerializer):
    like_movies = MovieSerializer(read_only=True, many=True)
    like_movies_cnt = serializers.IntegerField(source='like_movies.count', read_only=True)
    followers = UserSerializer(read_only=True, many=True)
    followers_cnt = serializers.IntegerField(source='followers.count', read_only=True)
    followings = UserSerializer(read_only=True, many=True)
    followings_cnt = serializers.IntegerField(source='followings.count', read_only=True)
    like_shots = ShotSerializer(read_only=True, many=True)
    like_shots_cnt = serializers.IntegerField(source='like_shots.count', read_only=True)
    shot_set = ShotSerializer(read_only=True, many=True)
    shot_cnt = serializers.IntegerField(source='shot_set.count', read_only=True)
    class Meta:
        model = get_user_model()
        fields = '__all__'