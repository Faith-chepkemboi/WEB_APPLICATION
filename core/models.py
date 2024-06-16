# core/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)  # Custom field for email
    phone_number = models.CharField(max_length=20, blank=True, null=True)  # Optional additional field

    def __str__(self):
        return self.username  # String representation of the User model
