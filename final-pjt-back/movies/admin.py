from django.contrib import admin
from .models import Genre, Video, Movie, StarRating, MovieComment


# Register your models here.
admin.site.register(Genre)
admin.site.register(Video)
admin.site.register(Movie)
admin.site.register(StarRating)
admin.site.register(MovieComment)