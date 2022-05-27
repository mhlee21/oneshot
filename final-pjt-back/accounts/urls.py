from django.urls import path
from . import views

urlpatterns = [
    path('profile/<username>/', views.profile),
    path('<int:user_id>/follow/', views.follow),
]