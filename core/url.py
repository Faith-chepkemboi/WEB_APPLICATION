from django.urls import path
from .views import register, user_login,views

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('api/register/', views.register_user, name='register_user'),

]
