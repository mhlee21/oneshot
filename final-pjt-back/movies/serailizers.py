from rest_framework import serializers
from .models import Movie, Genre, MovieComment, StarRating, Video
from django.contrib.auth import get_user_model
from shots.serializers.shot import ShotListSerializer
User = get_user_model()


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'


class MovieListSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(read_only=True, many=True)
    shot_cnt = serializers.IntegerField(source='shot_set.count', read_only=True)
    class Meta:
        model = Movie
        fields = ('pk','title','release_date','adult','popularity',
                'poster_path','genres','vote_average','vote_count',
                'shot_cnt')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pk', 'username')


class MovieCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = MovieComment
        fields = '__all__'
        read_only_fields = ('movie',)


class StarSerializer(serializers.ModelSerializer):
    #####################################################
    # my_movies API 에서 보여주기 위한 영화 정보
    #####################################################
    class MovieSerializer(serializers.ModelSerializer):
        genres = GenreSerializer(read_only=True, many=True)
        class Meta:
            model = Movie
            fields = ('pk','title', 'genres', 'poster_path')

    movie = MovieSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = StarRating
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):    
    genres = GenreSerializer(read_only=True, many=True)
    video = VideoSerializer(read_only=True, many=True)
    stars = StarSerializer(read_only=True, many=True)
    comments = MovieCommentSerializer(read_only=True, many=True)
    comments_cnt = serializers.IntegerField(source='comments.count', read_only=True)
    like_users = UserSerializer(read_only=True, many=True)
    like_cnt = serializers.IntegerField(source='like_users.count', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

