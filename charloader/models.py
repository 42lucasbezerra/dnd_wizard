from django.db import models


class Character(models.Model):
    """
    Model to store information about a character in DnD 5e
    """

    name = models.CharField(max_length=50, verbose_name='Character Name')
    level = models.IntegerField(default=1, verbose_name='Level')
    character_class = models.CharField(max_length=20, verbose_name='Class')
    background = models.CharField(max_length=50, verbose_name='Background')
    player_name = models.CharField(max_length=50, verbose_name='Players Name')
    race = models.CharField(max_length=20, verbose_name='Race')
    alignment = models.CharField(max_length=50, verbose_name='Alignment')
    experience_points = models.PositiveIntegerField(default=0, verbose_name='Experience Points')

    armor_class = models.IntegerField(default=10, verbose_name='Armor Class')
    initiative = models.IntegerField(default=0, verbose_name='Initiative')
    speed = models.IntegerField(default=0, verbose_name='Speed')
    total_hit_points = models.PositiveIntegerField(default=1, verbose_name='Total Hit Points')
    current_hit_points = models.PositiveIntegerField(default=1, verbose_name='Current Hit Points')
    temporary_hit_points = models.PositiveIntegerField(default=0, verbose_name='Temporary Hit Points')
    hit_dice_total = models.PositiveIntegerField(default=1, verbose_name='Hit Dice Total')
    hit_dice = models.CharField(max_length=3, verbose_name='Hit Dice')

    def __str__(self):
        return self.name.capitalize()

    class Meta:
        unique_together = ("name", "character_class", "race", "player_name")
