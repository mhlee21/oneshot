from django.urls import path
from . import views

urlpatterns = [
    path('', views.shot_create),
    path('page/<int:page>/', views.shots),
    path('detail/<int:shot_id>/', views.shot_detail),
    path('<int:shot_id>/', views.shot_update_or_delete),
    path('<int:shot_id>/likes/', views.shot_likes),
    path('<int:shot_id>/comments/', views.shot_comment_create),
    path('<int:shot_id>/comments/<int:comment_id>/', views.shot_comment_update_or_delete),
]
