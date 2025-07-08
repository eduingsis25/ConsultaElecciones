from rest_framework import serializers
from .models import censo


class CensoSerializer(serializers.ModelSerializer):
    class Meta:
        model = censo
        fields = '__all__'
