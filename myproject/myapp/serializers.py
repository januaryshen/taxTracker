from rest_framework import serializers
from .models import User, MileageData, OtherExpenses

class OtherExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherExpenses
        fields = ['id', 'user', 'date', 'description', 'amount']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name']

class MileageDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MileageData
        fields = ['id', 'user', 'date', 'departure_location', 'arrival_location', 'mileage', 'departure_lat', 'departure_lng', 'arrival_lat', 'arrival_lng']