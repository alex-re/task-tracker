from rest_framework import fields, serializers

from .models import Task
from accounts.serializers import UserSerializer


class TaskSerializer(serializers.ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = Task
        fields = "__all__"
