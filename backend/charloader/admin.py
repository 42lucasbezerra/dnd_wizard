from django.contrib import admin
from .models import Ability, Character, Spell, Weapon

admin.site.register(Ability)
admin.site.register(Character)
admin.site.register(Spell)
admin.site.register(Weapon)