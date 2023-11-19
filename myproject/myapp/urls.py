from django.urls import path
from .views import OtherExpensesCreate, UserCreate, MileageDataCreate

urlpatterns = [
    path('expenses/', OtherExpensesCreate.as_view(), name='expenses-create'),
    path('user/', UserCreate.as_view(), name='user-create'),
    path('mileageData/', MileageDataCreate.as_view(), name='mileageData-create'),
]
