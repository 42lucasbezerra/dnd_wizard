from django.contrib import admin
from .models import Character, Spell, Weapon

admin.site.register(Character)
admin.site.register(Spell)
admin.site.register(Weapon)