from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    # Add other user fields as needed

class MileageData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    departure_location = models.CharField(max_length=255)
    arrival_location = models.CharField(max_length=255)
    departure_lat = models.FloatField()
    departure_lng = models.FloatField()
    arrival_lat = models.FloatField()
    arrival_lng = models.FloatField()
    mileage = models.FloatField()

class OtherExpenses(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
