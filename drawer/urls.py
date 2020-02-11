from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='drawer/index'),
    path('upload',views.upload_file, name='drawer/upload_file')
]
