from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from .serializers import MyTokenObtainPairSerializer
from django.contrib.auth import authenticate, login, get_user_model


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'id': user.id, 'username': user.username, 'email': user.email}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    username = request.data.get('username')

    if not email or not password or not username:
        return Response({'detail': 'Please provide email, username, and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password, email=email)

    if user is not None:
        login(request, user)
        return Response({'detail': 'Login successful'})
    else:
        # Check if the username exists but the password is incorrect
        if username:
            user_by_username = User.objects.filter(username=username).first()
            if user_by_username and not user_by_username.check_password(password):
                return Response({'detail': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the email exists but the password is incorrect
        if email:
            user_by_email = User.objects.filter(email=email).first()
            if user_by_email and not user_by_email.check_password(password):
                return Response({'detail': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)

        # If neither username nor email matches or if user not found
        return Response({'detail': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

# update uder
@api_view(['PUT'])  # Update user data using PUT request
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)  # Partial update
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete user 
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_profile(request):
    user = request.user
    user.delete()
    return Response({'detail': 'Profile deleted successfully'})

    # change password
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get('oldPassword', '').strip()
    new_password = request.data.get('newPassword', '')
    repeat_new_password = request.data.get('repeatNewPassword', '')

    # Check if new passwords match
    if new_password != repeat_new_password:
        return Response({'detail': 'New passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if current password matches user's password
        if not user.check_password(current_password):
            return Response({'detail': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update user's password
        user.set_password(new_password)
        user.save()

        return Response({'detail': 'Password changed successfully.'})

    except Exception as e:
        logger.error(f"Error changing password for user {user.username}: {str(e)}")
        return Response({'detail': 'Failed to change password. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    
@api_view(['GET'])
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})


from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    pass  # No custom logic needed for token refresh
