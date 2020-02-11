from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='drawer2/index'),
    path('upload',views.upload_file, name='drawer2/upload_file')
]
