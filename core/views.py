# core/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import MyTokenObtainPairSerializer  
from rest_framework_simplejwt.views import TokenObtainPairView
@api_view(['POST'])
@permission_classes([AllowAny])
# register function
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'id': user.id, 'username': user.username, 'email': user.email}, status=201)
    return Response(serializer.errors, status=400)
# login function that calls backened@api_view(['POST'])
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    username = request.data.get('username')

    if not email or not password or not username:
        return Response({'detail': 'Please provide email, username, and password'}),


    user = authenticate(request, username=username, password=password,email=email)
    

    if user is not None:
        login(request, user)
        # Return success response with token or any other data
        return Response({'detail': 'Login successful'})
    else:
        # Return error response if authentication fails
        return Response({'detail': 'Invalid email or password'}, status=400)
    
    
    
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

# views.py

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    pass  # No custom logic needed for token refresh



