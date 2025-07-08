from rest_framework import serializers
from .models import votante


class VotanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = votante
        fields = '__all__'
