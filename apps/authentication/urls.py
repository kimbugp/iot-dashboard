from django.urls import path

from .views import LoginView, SocialAuthView, UsersView, UserView

urlpatterns = [
    path('social/<str:backend>/', SocialAuthView.as_view(), name='login'),
    path('user', UserView.as_view(), name='user'),
    path('login', LoginView.as_view(), name='login'),
    path('', UsersView.as_view(), name='users'),
]
