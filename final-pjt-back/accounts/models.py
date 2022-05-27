from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import os

# Create your models here.
class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    profile_image = models.ImageField(blank=True)

    def delete(self, *args, **kargs): # DB 삭제하는 경우 저장한 이미지도 삭제하기 위해
        if self.image:
            os.remove(os.path.join(settings.MEDIA_ROOT, self.image.path))
        super(User, self).delete(*args, **kargs)

    def __str__(self):
        return self.username