from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProfileSerializer
from .models import User

User = get_user_model()

@api_view(['GET'])
def profile(request, username):
    user = get_object_or_404(User, username=username)

    is_follow = False
    if request.user.id:
        me = request.user
        if me != user:
            if user.followers.filter(pk=me.pk).exists():
                is_follow = True
            else:
                is_follow = False
    serializer = ProfileSerializer(user)
    data = {
        'is_follow' : is_follow,
        'profile' : serializer.data,
    }
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, user_id):
    you = get_object_or_404(get_user_model(), pk=user_id)
    me = request.user

    if me != you:
        if you.followers.filter(pk=me.pk).exists():
            # 언팔로우
            is_follow = False
            you.followers.remove(me)
        else:
            # 팔로우
            is_follow = True
            you.followers.add(me)
        user = ProfileSerializer(you)
        data = {
            'is_follow' : is_follow,
            'user' : user.data,
        }
        return Response(data)
    else:
        data = {
            'detail': '자기 자신을 팔로우 할 수 없습니다.'
        }
        return Response(data)