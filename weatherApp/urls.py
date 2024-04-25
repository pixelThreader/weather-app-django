from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('credits/', views.acknowledge, name='acknowledge'),
    path('weatherAPI/', views.api3104, name='api3104'),
]