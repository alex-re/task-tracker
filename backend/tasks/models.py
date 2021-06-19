from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Task(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    reminder = models.BooleanField(default=False)
