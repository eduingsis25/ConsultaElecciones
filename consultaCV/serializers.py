from rest_framework import serializers
from .models import elector


class ElectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = elector
        fields = '__all__'
        extra_kwargs = {
            'cedula': {'read_only': True},
        }
