import pandas as pd


def handle_uploaded_file(f):
    df1 = pd.read_excel(f, header=None, sheet_name="Stats and Profs.", engine="openpyxl")

    # Replace NaN with none
    df = df1.where(pd.notnull(df1), None)

    weapons = []

    for i in range(5):
        if df[7][25 + i] is not None:
            weapons.append(
                {
                    "name": df[7][25 + i],
                    "atk_bonus": df[9][25 + i],
                    "proficiency": df[10][25 + i],
                    "extra": df[11][25 + i],
                }
            )

    df2 = pd.read_excel(f, header=None, sheet_name="Spellcasting", engine="openpyxl")

    spellcasting_ability = df2[7][6]
    spell_save_dc = df2[11][6]
    spell_attack_bonus = df2[15][6]

    spell_locations = {"Cantrips": []}
    spells = {"Cantrips": []}
    for i in range(9):
        spell_locations[f"Level {i+1}"] = []
        spells[f"Level {i+1}"] = []

    for k in range(14):
        spell_locations["Cantrips"].append((1, 13 + k))
        spell_locations["Level 1"].append((2, 30 + k))
        spell_locations["Level 2"].append((8, 13 + k))
        spell_locations["Level 3"].append((8, 30 + k))
        spell_locations["Level 4"].append((14, 13 + k))
        spell_locations["Level 5"].append((14, 30 + k))
        spell_locations["Level 6"].append((20, 13 + k))
        spell_locations["Level 7"].append((20, 30 + k))
        spell_locations["Level 8"].append((26, 13 + k))
        spell_locations["Level 9"].append((26, 30 + k))

    for key, val in spell_locations.items():
        for tup in val:
            value = df2[tup[0]][tup[1]]
            if pd.notna(value):
                spells[key].append(value)

    char_info = {
        "name": df[1][1],
        "player_name": df[17][1],
        "experience_points": df[17][3],
        "total_hit_points": df[7][11],
        "current_hit_points": df[9][10],
        "hit_dice_total": df[8][20],
        "hit_dice": df[7][21],
        "character_class": df[7][1],
        "level": df[9][1],
        "race": df[7][3],
        "background": df[11][1],
        "alignment": df[11][3],
        "inspiration": df[3][6],
        "proficiency": df[3][8],
        "armor_class": df[7][6],
        "initiative": df[9][6],
        "speed": df[11][6],
        "strength": df[1][7],
        "dexterity": df[1][12],
        "constitution": df[1][17],
        "intelligence": df[1][22],
        "wisdom": df[1][27],
        "charisma": df[1][32],
        "saving_throw_strength": df[4][10],
        "saving_throw_dexterity": df[4][11],
        "saving_throw_constitution": df[4][12],
        "saving_throw_intelligence": df[4][13],
        "saving_throw_wisdom": df[4][14],
        "saving_throw_charisma": df[4][15],
        "acrobatics": df[3][18],
        "animal_handling": df[3][19],
        "arcana": df[4][20],
        "athletics": df[4][21],
        "deception": df[4][22],
        "history": df[4][23],
        "insight": df[4][24],
        "intimidation": df[4][25],
        "investigation": df[4][26],
        "medicine": df[4][27],
        "nature": df[4][28],
        "perception": df[4][29],
        "performance": df[4][30],
        "persuasion": df[4][31],
        "religion": df[4][32],
        "sleight_of_hand": df[4][33],
        "stealth": df[4][34],
        "survival": df[4][35],
        "weapons": weapons,
        "spell_save_dc": spell_save_dc,
        "spellcasting_ability": spellcasting_ability,
        "spell_attack_bonus": spell_attack_bonus,
    }

    print(char_info['acrobatics'])
    return char_info, spells


def calculate_modifier(score):
    modifier = int((score - 10) / 2)

    return modifier
