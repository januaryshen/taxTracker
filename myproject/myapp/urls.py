from django.urls import path
from .views import OtherExpensesCreate, UserCreate, MileageDataCreate, OtherExpensesList, OtherExpensesUpdate

urlpatterns = [
    path('expenses/', OtherExpensesCreate.as_view(),
         name='other-expenses-create'),
    path('expenses/list/', OtherExpensesList.as_view(),
         name='other-expenses-list'),
    path('expenses/<int:pk>/', OtherExpensesUpdate.as_view(),
         name='other-expenses-detail'),

    path('mileage/', MileageDataAPIView.as_view(), name='mileage-list-create'),
    path('mileage/<int:pk>/', MileageDataAPIView.as_view(),
         name='mileage-update-delete'),
]