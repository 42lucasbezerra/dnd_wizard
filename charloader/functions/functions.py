import pandas as pd

def handle_uploaded_file(f):

    df = pd.read_excel(f, header=None, sheet_name='Stats and Profs.')

    char_info = {
        'Stats': {},
        'SavingThrows': {},
        'Skills': {},
        }

    info_locations = {
        'name': (1,1),
        'HPMax': (7,11),
        'HP': (9,10),
        'Class': (7,1),
        'Level': (9,1),
        'Race': (7,3),
        'Background': (11,1),
        'Alignment': (11,3),
        'Inspiration': (3,6),
        'Proficiency': (3,8),
        'AC': (7,6),
        'Initiative': (9,6),
        'Speed': (11,6),
        'Stats': {
            'STR': (1,7),
            'DEX': (1,12),
            'CON': (1,17),
            'INT': (1,22),
            'WIS': (1,27),
            'CHA': (1,32),
        },
        'SavingThrows': {
            'STR': (3,10),
            'DEX': (3,11),
            'CON': (3,12),
            'INT': (3,13),
            'WIS': (3,14),
            'CHA': (3,15),
        },
        'Skills':{
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
        },
        }

    for key,val in info_locations.items():
        if key == 'Stats' or key == 'SavingThrows' or key == 'Skills':
            for i, j in val.items():
                char_info[key][i] = df[j[0]][j[1]]
        else:
            char_info[key]=df[val[0]][val[1]]
            
    return char_info

'''def handle_uploaded_file(f):
    with open('charloader/static/upload/'+f.name, 'wb+') as destination:  
        for chunk in f.chunks():  
            destination.write(chunk)  '''