from rest_framework import generics
from rest_framework.response import Response
from django.views.generic.base import TemplateView
import requests


class UIView(TemplateView):

    template_name = "fend/index.html"


class SensorData(generics.ListAPIView):

    def get(self, request, **kwargs):
        page = request.query_params.get('page', 1)
        field = request.query_params.get('field', 1)
        number = request.query_params.get('number', 100)
        start = request.query_params.get('start', '2018-10-10')
        end = request.query_params.get('end', '2019-10-10')
        try:
            response = requests.get(
                f'https://thingspeak.com/channels/338402/field/{field}.json?results={number}&page={page}&start={start}&end={end}')  # noqa
            if response.status_code == 200:
                data = response.json()
            return Response(data)
        except requests.exceptions.RequestException:
            return Response({'error': 'no data'}, 400)


class CurrentData(generics.ListAPIView):

    def get(self, request, **kwargs):
        field = request.query_params.get('page', 1)
        try:
            response = requests.get(
                f'https://thingspeak.com/channels/338402/field/{field}/last.json')  # noqa
            if response.status_code == 200:
                data = response.json()
            return Response(data)
        except requests.exceptions.RequestException:
            return Response({'error': 'no data'}, 400)
