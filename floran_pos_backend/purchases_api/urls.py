from rest_framework import routers, urlpatterns

from .views import *
from django.urls import path

urlpatterns = [
    path('',purchaseApi.as_view()),
    path('instate/<int:pk>',singleInstatePurchaseDataApi.as_view()),
    path('outstate/<int:pk>',singleOutstatePurchaseDataApi.as_view()),
]