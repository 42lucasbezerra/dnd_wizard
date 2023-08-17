from django.db import models


class Character(models.Model):
    """
    Model to store information about a character in D&D 5e
    """

    name = models.CharField(max_length=50, verbose_name='Character Name', blank = True, null = True)
    character_class = models.CharField(max_length=20, verbose_name='Class', blank = True, null = True)
    background = models.CharField(max_length=50, verbose_name='Background', blank = True, null = True)
    player_name = models.CharField(max_length=50, verbose_name='Players Name', blank = True, null = True)
    race = models.CharField(max_length=20, verbose_name='Race', blank = True, null = True)
    alignment = models.CharField(max_length=50, verbose_name='Alignment', blank = True, null = True)
    hit_dice_total = models.CharField(max_length=15, verbose_name='Hit Dice Total', blank = True, null = True)
    hit_dice = models.CharField(max_length=15, verbose_name='Hit Dice', blank = True, null = True)

    armor_class = models.IntegerField(default=10, verbose_name='Armor Class', blank =True, null=True)
    initiative = models.IntegerField(default=0, verbose_name='Initiative', blank =True, null=True)
    speed = models.IntegerField(default=0, verbose_name='Speed')
    level = models.IntegerField(default=1, verbose_name='Level')

    experience_points = models.PositiveIntegerField(default=0, verbose_name='Experience Points', blank =True, null=True)
    total_hit_points = models.PositiveIntegerField(default=1, verbose_name='Total Hit Points', blank =True, null=True)
    current_hit_points = models.PositiveIntegerField(default=1, verbose_name='Current Hit Points', blank =True, null=True)
    temporary_hit_points = models.PositiveIntegerField(default=0, verbose_name='Temporary Hit Points', blank =True, null=True)


    
    def __str__(self):
        return self.name.capitalize()

    #class Meta:
    #    constraints =  [models.UniqueConstraint(fields=["name", "character_class", "race", "player_name"], name ='unique_character')]
