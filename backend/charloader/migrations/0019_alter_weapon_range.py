# Generated by Django 4.1 on 2023-09-08 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charloader', '0018_alter_weapon_range'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weapon',
            name='range',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='Range'),
        ),
    ]
