from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer

User = get_user_model()


class LogoutAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response(
            data={"message": f"Bye {request.user.username}!"},
            status=status.HTTP_204_NO_CONTENT,
        )


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.POST.get("username")
        password = request.POST.get("password")
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                serializer = UserSerializer(user)
                return Response(
                    data={"message": "OK", "user": serializer.data},
                    status=status.HTTP_302_FOUND,
                )
        return Response(
            data={"error": "INVALID_CREDENTIALS"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class UserRegistration(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    authentication_classes = []
    serializer_class = UserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
