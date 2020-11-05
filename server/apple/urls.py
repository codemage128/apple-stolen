from django.contrib import admin
from django.urls import path
from .views import get_juice_data, add_water

urlpatterns = [
    path('', get_juice_data, name="add_water"),
    path('add_water/', add_water, name="add_water"),
]