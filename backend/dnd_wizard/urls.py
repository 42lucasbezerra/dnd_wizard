"""dnd_wizard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.urls import path, include, re_path
from rest_framework import routers
from charloader import views


router = routers.DefaultRouter()
router.register(r'characters', views.CharacterView, 'characters')
router.register(r'abilities', views.AbilityView, 'abilities')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/uploadfile/', views.upload_file, name='uploadfile'),
    path('api/weapons/<str:weapon_name>/', views.WeaponByName.as_view(), name = 'weapon-by-name'),
    path('api/spells/<str:spell_name>/', views.SpellByName.as_view(), name = 'spell-by-name'),
    path('api/get_spell_list/', views.get_spell_list, name = 'get_spell_list'),
    path('roll-dice/<str:expression>/', views.roll_dice, name='roll-dice'),
]