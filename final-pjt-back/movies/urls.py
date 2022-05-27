from django.urls import path
from . import views


urlpatterns = [
    path('genre/', views.genre),
    path('movie_title/', views.movie_title),
    path('movie_trailer/', views.movie_trailer),
    path('popular/<int:page>/', views.movie_popular),
    path('now_playing/<int:page>/', views.now_playing),
    path('my_movies/', views.my_movies),
    path('shotest/', views.shotest),
    path('search/<int:page>/', views.search),
    path('page/<int:page>/', views.movies),
    path('<int:movie_id>/', views.movie_detail),
    path('<int:movie_id>/likes/', views.movie_likes),
    path('<int:movie_id>/comments/', views.movie_comment_create),
    path('<int:movie_id>/comments/<int:comment_id>/', views.movie_update_or_delete),
    path('<int:movie_id>/star_rating/', views.movie_star_rating),
]
