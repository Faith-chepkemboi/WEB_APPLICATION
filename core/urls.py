# core/urls.py

from django.urls import path
from .views import register_user,login_user,get_csrf_token,MyTokenRefreshView,MyTokenObtainPairView

urlpatterns = [
    path('api/register/', register_user, name='register_user'),  
    path('api/login/', login_user, name='login_user'),
    path('api/csrf_token/', get_csrf_token, name='csrf_token'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),


]




