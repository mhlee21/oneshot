from django.db import models
from django.conf import settings
from movies.models import Movie
import os


class Shot(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(blank=True)
    movie_char = models.CharField(max_length=100, blank=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_shots')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # def delete(self, *args, **kargs): # (local) DB 삭제하는 경우 저장한 이미지도 삭제하기 위해
    #     if self.image:
    #         os.remove(os.path.join(settings.MEDIA_ROOT, self.image.path))
    #     super(Shot, self).delete(*args, **kargs)
    
    def __str__(self):
        return self.title


class ShotComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    shot = models.ForeignKey(Shot, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.user