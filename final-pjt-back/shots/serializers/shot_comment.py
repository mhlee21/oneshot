from dataclasses import field
from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import ShotComment

User = get_user_model()

class ShotCommentSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ShotComment
        fields = '__all__'
        read_only_fields = ('shot',)