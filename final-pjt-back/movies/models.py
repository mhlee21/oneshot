from django.db import models
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Video(models.Model):
    name = models.CharField(max_length=100)
    key = models.CharField(max_length=100)
    size = models.IntegerField()
    type = models.CharField(max_length=20)
    official = models.BooleanField()

    def __str__(self):
        return self.key
    

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    overview = models.TextField()
    adult = models.BooleanField()
    popularity = models.FloatField()
    backdrop_path = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=100)
    video = models.ManyToManyField(Video, related_name="movie_videos")
    genres = models.ManyToManyField(Genre, related_name="movie_genres")
    # runtime = models.IntegerField()
    vote_average = models.FloatField()
    vote_count = models.IntegerField()
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')

    def __str__(self):
        return self.title


class StarRating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='stars')
    star = models.FloatField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.star}'


class MovieComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user