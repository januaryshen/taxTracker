from django.urls import path
from .views import MileageDataAPIView, OtherExpensesAPIView, UserAPIView

urlpatterns = [
    path('mileage/', MileageDataAPIView.as_view(), name='mileage-list-create'),
    path('mileage/<int:pk>/', MileageDataAPIView.as_view(),name='mileage-update-delete'),
    path('expenses/', OtherExpensesAPIView.as_view(), name='expenses-list-create'),
    path('expenses/<int:pk>/', OtherExpensesAPIView.as_view(),name='expenses-update-delete'),
    path('user/', UserAPIView.as_view(), name='user-list-create'),
    path('user/<int:pk>/', UserAPIView.as_view(),name='user-update-delete'),
]