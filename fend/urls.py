from django.urls import re_path

from .views import UIView

urlpatterns = [
    re_path(r'^(?:.*)/?$', UIView.as_view())
]
