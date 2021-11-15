from .views import *
from django.urls import path

urlpatterns = [
    path('',Dashboard_API.as_view()),
]