# Generated by Django 4.1 on 2023-08-29 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charloader', '0011_spells_remove_character_weapons'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='weapons',
            field=models.JSONField(null=True),
        ),
    ]
