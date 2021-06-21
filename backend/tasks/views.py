from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .serializers import TaskSerializer
from .models import Task
from .forms import TaskForm
from accounts.serializers import UserSerializer


class TaskList(APIView):
    """
    Retrieve, read or create a task instance.
    """

    # permission_classes = (IsAuthenticated,)
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response(TaskSerializer(Task.objects.all(), many=True).data)
        # tasks = Task.objects.filter(owner_id=request.user.id)
        # serializer = TaskSerializer(tasks, many=True)
        # return Response(data=serializer.data)

    def post(self, request, format=None):
        form = TaskForm(
            {
                "owner": request.user,
                "name": request.POST.get("name"),
                "reminder": request.POST.get("reminder"),
            }
        )
        if form.is_valid():
            task = form.save()
            serializer = TaskSerializer(task)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=form.errors)


class TaskDetail(APIView):
    """
    Retrieve, update or delete a task instance.
    """

    def get(self, request, pk, format=None):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                data={"error": "not_found"}, status=status.HTTP_404_NOT_FOUND
            )
        if request.user == task.owner:
            serializer = TaskSerializer(task)
            return Response(serializer.data)
        return Response(
            data={"message": "permission_denied"}, status=status.HTTP_403_FORBIDDEN
        )

    def put(self, request, pk, format=None):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                data={"error": "not_found"}, status=status.HTTP_404_NOT_FOUND
            )
        if request.user == task.owner:
            serializer = TaskSerializer(task, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            data={"message": "permission_denied"}, status=status.HTTP_403_FORBIDDEN
        )

    def delete(self, request, pk, format=None):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                data={"error": "not_found"}, status=status.HTTP_404_NOT_FOUND
            )
        if request.user == task.owner:
            task.delete()
            return Response(data={"message": "ok"}, status=status.HTTP_200_OK)
        return Response(
            data={"message": "permission_denied"}, status=status.HTTP_403_FORBIDDEN
        )
