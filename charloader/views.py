from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.urls import reverse

from charloader.forms import UploadForm
from charloader.models import Character
from charloader.functions.functions import handle_uploaded_file


def loader(request, name):
    #character = Character.objects.get(name=name)
    return render(request, 'loader.html', {'name':name})

def index(request):
    if request.method == 'POST':

        user_form = UploadForm(request.POST, request.FILES)
        if user_form.is_valid():
            my_dict =  handle_uploaded_file(request.FILES['file'])
            return HttpResponseRedirect(reverse("charloader:loader", kwargs={'name':my_dict["name"]}))#render(request, 'loader.html', {'name':'Smander Beauregard'})
    else:
        user_form = UploadForm()

    return render(request, 'home.html',{'form':user_form})