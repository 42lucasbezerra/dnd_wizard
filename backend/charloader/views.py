from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.conf import settings
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt


from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CharacterSerializer, SpellSerializer, WeaponSerializer

from charloader.forms import UploadForm
from charloader.models import Character, Spell, Weapon
from charloader.functions.functions import handle_uploaded_file, calculate_modifier

import d20
import pandas as pd


def loader(request, name):
    char = Character.objects.filter(name=name)[0]

    return render(request, 'loader.html', {'char':char})


def index(request):
    if request.method == 'POST':

        user_form = UploadForm(request.POST, request.FILES)
        if user_form.is_valid():

            # Parse information from character sheet
            char_info =  handle_uploaded_file(request.FILES['file'])

            # Delete character if it already exists
            if Character.objects.filter(name = char_info["name"]).exists():
                Character.objects.filter(name = char_info["name"]).delete()
                
            # Create character model object
            char = Character()
            prefix = "char."

            fieldnames = []
            char._meta.get_fields()

            # Get the model object fieldnames
            for field in char._meta.get_fields():
                fieldnames.append(field.name)

            # Populate the character information (skip fieldnames[0] because it is 'id')
            for key in fieldnames[1:]:
                operation = f"{prefix}{key} = char_info[key]"
                try:
                    exec(operation)
                except:
                    exec(f"char.{key} = None")
            
            # To save the character in the database uncomment below:
            char.save()

            return HttpResponseRedirect(reverse("charloader:loader", kwargs={'name':char.name}))#render(request, 'loader.html', {'name':'Smander Beauregard'})
    else:
        user_form = UploadForm()

    return render(request, 'home.html',{'form':user_form})

class CharacterView(viewsets.ModelViewSet):
    serializer_class = CharacterSerializer
    queryset = Character.objects.all()


class WeaponByName(APIView):
    def get(self, request, weapon_name):
        try:
            weapon = Weapon.objects.filter(name__iexact = weapon_name).first()
            
            serializer = WeaponSerializer(weapon)
            return Response(serializer.data)
        except Weapon.DoesNotExist:
            return Response({"message": "Weapon not found in the database. Check your spelling?"})
            
class SpellByName(APIView):
    def get(self, request, spell_name):
        try:
            spell = Spell.objects.get(spell_name = spell_name)
            
            serializer = SpellSerializer(spell)
            return Response(serializer.data)
        except Spell.DoesNotExist:
            return Response({"message": "Spell not found in the database. Check your spelling?"})




@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        
        user_form = UploadForm(request.POST, request.FILES)
        print(request.FILES['myFile'])
        # Parse information from character sheet
        char_info, spells =  handle_uploaded_file(request.FILES['myFile'])

        # Delete character if it already exists
        if Character.objects.filter(name = char_info["name"]).exists():
            Character.objects.filter(name = char_info["name"]).delete()
            
        # Create character model object
        char = Character()
        prefix = "char."

        fieldnames = []
        char._meta.get_fields()

        # Get the model object fieldnames
        for field in char._meta.get_fields():
            fieldnames.append(field.name)

        # Populate the character information (skip fieldnames[0] because it is 'id')
        for key in fieldnames[1:]:
            if key != 'spells':
                operation = f"{prefix}{key} = char_info[key]"
                try:
                    exec(operation)
                except:
                    exec(f"char.{key} = None")
        
        # To save the character in the database uncomment below:
        char.save()
        
        spell_list = []

        for key, spell_level in spells.items():
            for spell_name in spell_level:
                try:
                    spell = Spell.objects.get(spell_name__iexact=spell_name)
                    spell_list.append(spell)
                except Spell.DoesNotExist:
                    pass

        char.spells.set(spell_list)

        # Return the created object's data in the response
        return JsonResponse({'id': char.id, 'spells': spells})
    else:
        return JsonResponse({'error': 'File upload failed'}, status=400)
    

def get_spell_list(request):
    spells = Spell.objects.all().values()
    return JsonResponse({'spells': list(spells)})

def roll_dice(request, expression):
    try:
        result = d20.roll(expression)
        return JsonResponse({'result_str': str(result), 'total': result.total, 'crit': result.crit})
    except Exception as e:
        return JsonResponse({'error': str(e)})