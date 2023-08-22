from django import forms
from charloader.models import Character

class UploadForm(forms.Form):
    file = forms.FileField() # create the file input