from django.db import models


class Character(models.Model):
    """
    Model to store information about a character in D&D 5e
    """
    # General Information
    name = models.CharField(max_length=50, verbose_name='Character Name', blank = True, null = True)
    character_class = models.CharField(max_length=20, verbose_name='Class', blank = True, null = True)
    background = models.CharField(max_length=50, verbose_name='Background', blank = True, null = True)
    player_name = models.CharField(max_length=50, verbose_name='Players Name', blank = True, null = True)
    race = models.CharField(max_length=20, verbose_name='Race', blank = True, null = True)
    alignment = models.CharField(max_length=50, verbose_name='Alignment', blank = True, null = True)
    hit_dice_total = models.CharField(max_length=15, verbose_name='Hit Dice Total', blank = True, null = True)
    hit_dice = models.CharField(max_length=15, verbose_name='Hit Dice', blank = True, null = True)

    # Top of the sheet values
    armor_class = models.PositiveIntegerField(default=10, verbose_name='Armor Class', blank =True, null=True)
    initiative = models.IntegerField(default=0, verbose_name='Initiative', blank =True, null=True)
    inspiration = models.IntegerField(default=0, verbose_name='Inspiration', blank =True, null = True)
    proficiency = models.PositiveIntegerField(default=0, verbose_name='Proficiency Bonus', blank = True, null = True)
    speed = models.PositiveIntegerField(default=30, verbose_name='Speed', blank = True, null = True)
    level = models.PositiveIntegerField(default=1, verbose_name='Level', blank = True, null = True)

    # XP & HP
    experience_points = models.PositiveIntegerField(default=0, verbose_name='Experience Points', blank =True, null=True)
    total_hit_points = models.PositiveIntegerField(default=1, verbose_name='Total Hit Points', blank =True, null=True)
    current_hit_points = models.PositiveIntegerField(default=1, verbose_name='Current Hit Points', blank =True, null=True)
    temporary_hit_points = models.PositiveIntegerField(default=0, verbose_name='Temporary Hit Points', blank =True, null=True)
    
    # Ability Scores
    strength = models.PositiveIntegerField(default=10, verbose_name = 'Strength Score', blank=True, null=True)
    dexterity = models.PositiveIntegerField(default=10, verbose_name = 'Dexterity Score', blank=True, null=True)
    constitution = models.PositiveIntegerField(default=10, verbose_name = 'Constitution Score', blank=True, null=True)
    intelligence = models.PositiveIntegerField(default=10, verbose_name = 'Intelligence Score', blank=True, null=True)
    wisdom = models.PositiveIntegerField(default=10, verbose_name = 'Wisdom Score', blank=True, null=True)
    charisma = models.PositiveIntegerField(default=10, verbose_name = 'Charisma Score', blank=True, null=True)
    
    # Saving throws
    saving_throw_strength = models.IntegerField(default=0, verbose_name = 'Strength Saving Throw', blank=True, null=True)
    saving_throw_dexterity = models.IntegerField(default=0, verbose_name = 'Dexterity Saving Throw', blank=True, null=True)
    saving_throw_constitution = models.IntegerField(default=0, verbose_name = 'Constitution Saving Throw', blank=True, null=True)
    saving_throw_intelligence = models.IntegerField(default=0, verbose_name = 'Intelligence Saving Throw', blank=True, null=True)
    saving_throw_wisdom = models.IntegerField(default=0, verbose_name = 'Wisdom Saving Throw', blank=True, null=True)
    saving_throw_charisma = models.IntegerField(default=0, verbose_name = 'Charisma Saving Throw', blank=True, null=True)

    # Skill modifiers
    acrobatics = models.IntegerField(default=0, verbose_name = 'Acrobatics Modifier', blank = True, null = True)
    animal_handling = models.IntegerField(default=0, verbose_name = 'Animal Handling Modifier', blank = True, null = True)
    arcana = models.IntegerField(default=0, verbose_name = 'Arcana Modifier', blank = True, null = True)
    athletics = models.IntegerField(default=0, verbose_name = 'Athletics Modifier', blank = True, null = True)
    deception = models.IntegerField(default=0, verbose_name = 'Deception Modifier', blank = True, null = True)
    history = models.IntegerField(default=0, verbose_name = 'Distory Modifier', blank = True, null = True)
    insight = models.IntegerField(default=0, verbose_name = 'Insight Modifier', blank = True, null = True)
    intimidation = models.IntegerField(default=0, verbose_name = 'Intimidation Modifier', blank = True, null = True)
    investigation = models.IntegerField(default=0, verbose_name = 'Investigation Modifier', blank = True, null = True)
    medicine = models.IntegerField(default=0, verbose_name = 'Medicine Modifier', blank = True, null = True)
    nature = models.IntegerField(default=0, verbose_name = 'Mature Modifier', blank = True, null = True)
    perception = models.IntegerField(default=0, verbose_name = 'Perception Modifier', blank = True, null = True)
    performance = models.IntegerField(default=0, verbose_name = 'Performance Modifier', blank = True, null = True)
    persuasion = models.IntegerField(default=0, verbose_name = 'Persuasion Modifier', blank = True, null = True)
    religion = models.IntegerField(default=0, verbose_name = 'Religion Modifier', blank = True, null = True)
    sleight_of_hand = models.IntegerField(default=0, verbose_name = 'Sleight of Hand Modifier', blank = True, null = True)
    stealth = models.IntegerField(default=0, verbose_name = 'Stealth Modifier', blank = True, null = True)
    survival = models.IntegerField(default=0, verbose_name = 'Survival Modifier', blank = True, null = True)

    # Attacks
    weapons = models.JSONField(null=True)

    
    def __str__(self):
        return self.name.capitalize()

    #class Meta:
    #    constraints =  [models.UniqueConstraint(fields=["name", "character_class", "race", "player_name"], name ='unique_character')]

class Spells(models.Model):
    """
    5e spell information
    """
    spell_id = models.IntegerField(primary_key=True)
    spell_name = models.CharField(max_length = 50)
    spell_level = models.IntegerField(default = 0, null = True, blank = True)
    spell_type = models.CharField(max_length = 50, blank = True, null = True)
    casting_time = models.CharField(max_length = 50, blank = True, null = True)
    spell_range = models.CharField(max_length = 50, blank = True, null = True)
    components = models.TextField(null = True, blank = True)
    duration = models.CharField(max_length = 50, blank = True, null = True)
    notes = models.TextField(null = True, blank = True)
    higher_levels = models.TextField(null = True, blank = True)

    def __str__(self):
        return self.name.capitalize()