from django.urls import path

from . import views

app_name = "charloader"
urlpatterns = [
    path("", views.index, name="index"),
    path("loader/<name>", views.loader, name="loader")
]