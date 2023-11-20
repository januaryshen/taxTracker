from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import MileageData, OtherExpenses, User 
from .serializers import OtherExpensesSerializer, UserSerializer, MileageDataSerializer
import requests
from django.conf import settings
from django.db.models import Q

class GenericAPIView(generics.GenericAPIView):
    serializer_class = None
    queryset = None

    # GET method for listing items or getting a single item
    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            # Get a single item
            item = get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
            serializer = self.get_serializer(item)
        else:
            # List items
            queryset = self.filter_queryset(self.get_queryset())

            startDate = request.query_params.get('startDate')
            endDate = request.query_params.get('endDate')
            query = Q()
            if startDate:
                query &= Q(date__gte=startDate)
            if endDate:
                query &= Q(date__lte=endDate)

            if query:
                queryset = queryset.filter(query)

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


class UserAPIView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  


class OtherExpensesAPIView(GenericAPIView):
    queryset = OtherExpenses.objects.all()
    serializer_class = OtherExpensesSerializer
  

class MileageDataAPIView(GenericAPIView):
    queryset = MileageData.objects.all()
    serializer_class = MileageDataSerializer

    def post(self, request, *args, **kwargs):
        departure_location = request.data.get('departure_location')
        arrival_location = request.data.get('arrival_location')

        if departure_location and arrival_location:
            # Call Google Maps API to get mileage
            distance = self.get_mileage_from_google_maps(departure_location, arrival_location)
            if distance is None:
                return Response({"error": "Could not calculate mileage"}, status=status.HTTP_400_BAD_REQUEST)
            request.data['mileage'] = distance

        return super().post(request, *args, **kwargs)

    def get_mileage_from_google_maps(self, origin, destination):
        api_key = settings.GOOGLE_MAPS_API_KEY  # Ensure this is added in your settings
        url = "https://maps.googleapis.com/maps/api/distancematrix/json"

        params = {
            "origins": origin,
            "destinations": destination,
            "key": api_key,
            "units": "imperial"  # or "metric"
        }

        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            # Extract distance from response
            print(data)
            distance = data['rows'][0]['elements'][0]['distance']['value']  # value in meters
            return distance / 1000.0  # convert to kilometers if needed
        return None

  