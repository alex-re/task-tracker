from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token

from .views import *

urlpatterns = [
    path("users/", UserList.as_view()),
    path("users/<int:pk>/", UserDetail.as_view()),
    path("login/", csrf_exempt(LoginAPIView.as_view())),
    path("logout/", LogoutAPIView.as_view()),
    path("register/", UserRegistration.as_view()),
    # path("", include("rest_framework.urls")),
    # path("login/", obtain_auth_token),
]
