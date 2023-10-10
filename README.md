# [D&D 5e Wizard](link-to-5e-wizard)

D&D 5e Wizard is a web application which helps new and experienced players play the game. By uploading their character sheet from a lightweight, automated spreadsheet format, the application interfaces with a database containing spell information, weapon information, and a large amount of the 5e rulebook.

This enables automatic rolling for skills and saving throws, as well as spell and weapon information popups and custom dice rolls using d20 syntax.

Currently does not allow characters to be accessed from database; character sheets must be uploaded every time to access the character information.
Limited support for multiclassing.

## Features

## Getting Started

These instructions will help you set up and run D&D Character Loader on your local machine for development and testing purposes.

### Prerequisites

- [Python](https://www.python.org/downloads/) (>=3.6)
- [Django](https://www.djangoproject.com/download/) (>=3.0)
- [Django Rest Framework](https://www.django-rest-framework.org/#installation) (>=3.11)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dnd-character-loader.git
   cd dnd-character-loader

2. Create a virtual environment:
   ```bash
   python -m venv myenv
   
4. Activate the virtual environment:
   - Windows:
     ```bash
     myenv\Scripts\activate
   - macOS and Linux:
     ```bash
     source myenv/bin/activate
5. Install project dependencies:
   ```bash
   pip install -r requiements.txt
6. Apply migrations:
   ```bash
   python manage.py migrate
8. Load data from JSON dump:
   ```bash
   python manage.py loaddata data.json
10. Start the development server
    ```bash
    python manage.py runserver
