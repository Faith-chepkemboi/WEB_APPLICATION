# core/urls.py

from django.urls import path
from .views import register_user, login_user, get_csrf_token, MyTokenRefreshView, MyTokenObtainPairView, get_user_profile,update_user_profile,delete_user_profile,change_password,forgot_password,reset_password

urlpatterns = [
    path('api/register/', register_user, name='register_user'),
    path('api/profile/', get_user_profile, name='get_user_profile'),
     path('api/updateProfile/', update_user_profile, name='update_user_profile'),
      path('api/changePassword/', change_password, name='change_password'),
      path('api/forgot-password/', forgot_password, name='forgot_password'),
      
      path('api/reset-password/', reset_password, name='reset_password'),

     path('api/deleteProfile/', delete_user_profile, name='delete_user_profile'),
    path('api/login/', login_user, name='login_user'),
    path('api/csrf_token/', get_csrf_token, name='csrf_token'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
]
