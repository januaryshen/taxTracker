from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import MileageData, OtherExpenses, User 
from .serializers import OtherExpensesSerializer, UserSerializer, MileageDataSerializer

class GenericAPIView(generics.GenericAPIView):
    serializer_class = None
    queryset = None

    # GET method for listing items or getting a single item
    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            # Get a single item
            item = generics.get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
            serializer = self.get_serializer(item)
        else:
            # List items
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # POST method for creating an item
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PATCH method for updating an item
    def patch(self, request, *args, **kwargs):
        item = generics.get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
        serializer = self.get_serializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE method for deleting an item
    def delete(self, request, *args, **kwargs):
        item = generics.get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MileageDataAPIView(GenericAPIView):
    queryset = MileageData.objects.all()
    serializer_class = MileageDataSerializer

class OtherExpensesAPIView(GenericAPIView):
    queryset = OtherExpenses.objects.all()
    serializer_class = OtherExpensesSerializer

class UserAPIView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer      