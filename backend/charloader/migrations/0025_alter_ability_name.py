# Generated by Django 4.1 on 2023-10-02 23:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charloader', '0024_alter_ability_options_alter_spell_casting_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ability',
            name='name',
            field=models.CharField(max_length=70, verbose_name='Name'),
        ),
    ]
