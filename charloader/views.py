from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from charloader.forms import DocumentForm


def index(request):
    return render(request, 'home.html')

def loader(request):
    return render(request, 'loader.html', {'name':'Smander Beauregard'})

def model_form_upload(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = DocumentForm()
    return render(request, 'model_form_upload.html', {
        'form': form
    })