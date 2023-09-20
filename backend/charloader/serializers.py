from rest_framework import serializers
from .models import Ability, Character, Weapon, Spell

class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = ('__all__')

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = (
            'id',
            'name',
            'character_class',
            'background',
            'player_name',
            'race',
            'alignment',
            'hit_dice_total',
            'hit_dice',
            'armor_class',
            'initiative',
            'inspiration',
            'proficiency',
            'speed',
            'level',
            'experience_points',
            'total_hit_points',
            'current_hit_points',
            'temporary_hit_points',
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
            'saving_throw_strength',
            'saving_throw_dexterity',
            'saving_throw_constitution',
            'saving_throw_intelligence',
            'saving_throw_wisdom',
            'saving_throw_charisma',
            'acrobatics',
            'animal_handling',
            'arcana',
            'athletics',
            'deception',
            'history',
            'insight',
            'intimidation',
            'investigation',
            'medicine',
            'nature',
            'perception',
            'performance',
            'persuasion',
            'religion',
            'sleight_of_hand',
            'stealth',
            'survival',
            'weapons',
            'spells',
        )

class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = ('__all__')

class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spell
        fields = ('__all__')
