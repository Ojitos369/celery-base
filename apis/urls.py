from django.urls import path

from apis.api import HelloWorld

urlpatterns = [
    path('hello_world/', HelloWorld.as_view(), name='hello_world'),
]