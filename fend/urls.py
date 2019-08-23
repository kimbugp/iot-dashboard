from django.urls import re_path, path

from .views import UIView, SensorData, CurrentData

urlpatterns = [
    path('sensor', SensorData.as_view(), name='sensor'),
    path('sensor/current', CurrentData.as_view(), name='current'),
    re_path(r'^(?:.*)/?$', UIView.as_view()),
]
