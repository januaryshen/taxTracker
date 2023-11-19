from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import OtherExpenses
from .serializers import OtherExpensesSerializer, UserSerializer, MileageDataSerializer

class OtherExpensesCreate(APIView):
    def post(self, request, format=None):
        serializer = OtherExpensesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserCreate(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MileageDataCreate(APIView):
    def post(self, request, format=None):
        serializer = MileageDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)