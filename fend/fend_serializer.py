from rest_framework import serializers


class ParamSerializer(serializers.Serializer):
    page = serializers.IntegerField(required=False)
    field = serializers.IntegerField(required=False)
    number = serializers.IntegerField(required=False)
    start = serializers.DateField(required=False)
    end = serializers.DateField(required=False)
