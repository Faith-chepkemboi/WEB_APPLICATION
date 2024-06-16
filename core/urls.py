# core/urls.py

from django.urls import path
from .views import register_user

urlpatterns = [
    path('api/register/', register_user, name='register_user'),  # Example URL for register_user function
]
