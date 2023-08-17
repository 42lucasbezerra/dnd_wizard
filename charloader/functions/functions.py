import pandas as pd

def handle_uploaded_file(f):

    df = pd.read_excel(f, header=None, sheet_name='Stats and Profs.')

    # TODO: make sure info_locations matches models.py, finish fields

    info_locations = {
        'name': (1,1),
        'total_hit_points': (7,11),
        'current_hit_points': (9,10),
        'character_class': (7,1),
        'level': (9,1),
        'race': (7,3),
        'background': (11,1),
        'alignment': (11,3),
        'Inspiration': (3,6),
        'Proficiency': (3,8),
        'armor_class': (7,6),
        'initiative': (9,6),
        'speed': (11,6),
        'StatsSTR': (1,7),
        'StatsDEX': (1,12),
        'StatsCON': (1,17),
        'StatsINT': (1,22),
        'StatsWIS': (1,27),
        'StatsCHA': (1,32),
        'SavingThrowsSTR': (3,10),
        'SavingThrowsDEX': (3,11),
        'SavingThrowsCON': (3,12),
        'SavingThrowsINT': (3,13),
        'SavingThrowsWIS': (3,14),
        'SavingThrowsCHA': (3,15),
        'Acrobatics': (3,18),
        'Animal Handling': (3,19),
        'Arcana': (3,20),
        'Athletics': (3,21),
        'Deception': (3,22),
        'History': (3,23),
        'Insight': (3,24),
        'Intimidation': (3,25),
        'Investigation': (3,26),
        'Medicine': (3,27),
        'Nature': (3,28),
        'Perception': (3,29),
        'Performance': (3,30),
        'Persuasion': (3,31),
        'Religion': (3,32),
        'Sleight of Hand': (3,33),
        'Stealth': (3,34),
        'Survival': (3,35),
    }
            
    return df, info_locations