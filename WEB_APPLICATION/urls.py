from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('core/', include('core.urls')),  # Include core app's URLs
    # You can add more paths for other apps here if needed
]
