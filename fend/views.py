import os

from django.views.generic.base import TemplateView


class UIView(TemplateView):

    template_name = "fend/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['BASE_URL'] = os.environ.get('BASE_URL')
        return context


class SensorData(TemplateView):

    template_name = "fend/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['BASE_URL'] = os.environ.get('BASE_URL')
        return context
