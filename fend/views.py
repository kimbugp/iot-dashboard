import requests
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic.base import TemplateView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .fend_serializer import ParamSerializer

CACHE_TTL = getattr(settings, 'CACHE_TTL', 60*3)


class UIView(TemplateView):
    template_name = "fend/index.html"


class SensorData(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ParamSerializer

    @method_decorator(cache_page(CACHE_TTL))
    def get(self, request, **kwargs):
        serializer = self.serializer_class(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        page = serializer.validated_data.get('page', 1)
        field = serializer.validated_data.get('field', 1)
        number = serializer.validated_data.get('number', 100)
        start = serializer.validated_data.get('start', '2018-10-10')
        end = serializer.validated_data.get('end', '2019-10-10')
        try:
            response = requests.get(
                f'https://thingspeak.com/channels/338402/field/{field}.json?results={number}&page={page}&start={start}&end={end}')  # noqa
            if response.status_code == 200:
                data = response.json()
                return Response(data)
            return Response({'error': 'no data'}, 400)
        except requests.exceptions.RequestException:
            return Response({'error': 'no data'}, 400)


class CurrentData(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, **kwargs):
        field = request.query_params.get('page', 1)
        try:
            response = requests.get(
                f'https://thingspeak.com/channels/338402/field/{field}/last.json')  # noqa
            if response.status_code == 200:
                data = response.json()
                return Response(data)
            return Response({'error': 'no data'}, 400)
        except requests.exceptions.RequestException:
            return Response({'error': 'no data'}, 400)
