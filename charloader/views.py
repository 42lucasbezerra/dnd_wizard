from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.urls import reverse

from charloader.forms import UploadForm
from charloader.models import Character
from charloader.functions.functions import handle_uploaded_file

import pandas as pd


def loader(request, name):
    char = Character.objects.filter(name=name)[0]

    # TODO: pass full character to render, add to loader.html

    return render(request, 'loader.html', {'char':char})


def index(request):
    if request.method == 'POST':

        user_form = UploadForm(request.POST, request.FILES)
        if user_form.is_valid():

            # Parse information from character sheet
            df, info_locations =  handle_uploaded_file(request.FILES['file'])

            # TODO: INSERT IF STATEMENT HERE TO CHECK THE CHARACTER DOES NOT ALREADY EXIST.
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
                operation = f"{prefix}{key} = df[info_locations[key][0]][info_locations[key][1]]"
                try:
                    exec(operation)
                except:
                    exec(f"char.{key} = None")
            
            # To save the character in the database uncomment below:
            char.save()
            print('THE CHARACTER ID IS \n')
            print(char.id)

            return HttpResponseRedirect(reverse("charloader:loader", kwargs={'name':char.name}))#render(request, 'loader.html', {'name':'Smander Beauregard'})
    else:
        user_form = UploadForm()

    return render(request, 'home.html',{'form':user_form})