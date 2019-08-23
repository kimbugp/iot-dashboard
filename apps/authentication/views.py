from django.contrib.auth import login
from rest_framework import generics
from rest_framework.permissions import (AllowAny, DjangoModelPermissions,
                                        IsAdminUser, IsAuthenticated)
from rest_framework.response import Response
from social_core.exceptions import SocialAuthBaseException
from social_django.utils import load_backend, load_strategy

from apps.authentication.models import User

from .serializer import LoginSerializer, SocialSerializer, NormalUserSerializer


class SocialAuthView(generics.CreateAPIView):
    serializer_class = SocialSerializer

    def post(self, request, backend, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            strategy = load_strategy(request)
            request.backend = load_backend(strategy, backend, None)
            user = request.backend.do_auth(
                serializer.validated_data['access_token'])
        except (SocialAuthBaseException) as e:
            return Response({"error": str(e)}, status=400)
        if user:
            login(request, user)
            serializer = NormalUserSerializer(user)
            return Response(serializer.data)
        return Response({"error": "unknown login error"}, status=400)


class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)


class UserView(generics.RetrieveAPIView):
    serializer_class = NormalUserSerializer
    permission_classes = (DjangoModelPermissions, IsAuthenticated)
    queryset = User.objects.all()

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)


class UsersView(generics.ListAPIView, generics.CreateAPIView):
    "Get all users"
    queryset = User.objects.all()
    serializer_class = NormalUserSerializer
    permission_classes = (DjangoModelPermissions, IsAdminUser)
