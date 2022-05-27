from rest_framework import serializers
from django.contrib.auth import get_user_model

from movies.models import Movie
from ..models import Shot
from .shot_comment import ShotCommentSerializer

User = get_user_model()

class MovieSerializer(serializers.ModelSerializer):

        class Meta:
            model = Movie
            fields = ('pk', 'title')
    

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pk', 'username',)


class ShotSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    movie = MovieSerializer(read_only=True)
    comments = ShotCommentSerializer(many=True, read_only=True)
    comments_cnt = serializers.IntegerField(source='comments.count', read_only=True)
    like_users = UserSerializer(many=True, read_only=True)
    like_cnt = serializers.IntegerField(source='like_users.count', read_only=True)
    image = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = Shot
        fields = '__all__'

class ShotListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    movie = MovieSerializer(read_only=True)
    comments = ShotCommentSerializer(many=True, read_only=True)
    comments_cnt = serializers.IntegerField(source='comments.count', read_only=True)
    like_users = UserSerializer(many=True, read_only=True)
    like_cnt = serializers.IntegerField(source='like_users.count', read_only=True)
    
    class Meta:
        model = Shot
        fields = '__all__'