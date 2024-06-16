# from django.contrib.auth.models import User
# from django.shortcuts import render, redirect
# from django.contrib.auth import authenticate, login

# def register(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         User.objects.create_user(username=username, password=password)
#         return redirect('login')
#     return render(request, 'register.html')

# def user_login(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return redirect('profile')
#     return render(request, 'login.html')
# core/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'id': user.id, 'username': user.username, 'email': user.email}, status=201)
    return Response(serializer.errors, status=400)
