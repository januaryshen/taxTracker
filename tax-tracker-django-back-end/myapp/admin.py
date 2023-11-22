from django.contrib import admin
from .models import User, MileageData, OtherExpenses

admin.site.register(User)
admin.site.register(MileageData)
admin.site.register(OtherExpenses)
