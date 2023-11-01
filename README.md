# [D&D 5e Wizard](link-to-5e-wizard)

D&D 5e Wizard is a web application which helps new and experienced players play the game. By uploading their character sheet from a lightweight, automated spreadsheet format, the application interfaces with a database containing spell information, weapon information, and a large amount of the 5e rulebook.

This enables automatic rolling for skills and saving throws, as well as spell and weapon information popups and custom dice rolls using d20 syntax.

Currently does not allow characters to be accessed from database; character sheets must be uploaded every time to access the character information.
Limited support for multiclassing.

https://github.com/42lucasbezerra/dnd_wizard/assets/50885067/5e95e61a-5ec8-45f7-8d3e-9c45512ee245


## Features

## Getting Started

These instructions will help you set up and run D&D Character Loader on your local machine for development and testing purposes.

### Prerequisites

- [Python](https://www.python.org/downloads/) (>=3.6)
- [Django](https://www.djangoproject.com/download/) (>=3.0)
- [Django Rest Framework](https://www.django-rest-framework.org/#installation) (>=3.11)

### Setting up a Local Postgres Database for Your Django Project
1. Install PostgreSQL: If you don't have PostgreSQL installed on your system, you can download and install it from the [official PostgreSQL website](https://www.postgresql.org/download/).

2. Create a PostgreSQL Database:

   - Open your terminal and log in to PostgreSQL with the psql command (you might need to enter your PostgreSQL superuser password):

   ```bash
   psql -U postgres
   ```

   - Once you're in the PostgreSQL shell, create a new database for your Django project:

   ```sql
   CREATE DATABASE dnd5e_wizard;
   ```
   You can replace dnd5e_wizard with the desired name for your database.

   - Exit the PostgreSQL shell:

   ```sql
   \q
   ```
3. Install psycopg2: You'll need the psycopg2 package to connect your Django project to the PostgreSQL database. You can install it via pip:
   
   ```bash
   pip install psycopg2
   ```
   
4. Create a .env File:
   
   Create a .env file in the root of your Django project to store environment variables securely. You can use the following format:
   ```dotenv
   DATABASE_URL='postgresql://username:password@localhost:port/dnd5e_wizard'

   # set it to some random/secret value.
   # easy way to get a random value: on Linux/Macs, run `uuidgen` and use that uuid
   DJANGO_SECRET_KEY='.............................................'
   
   # leave as is
   ALLOWED_HOSTS='localhost'
   ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/42lucasbezerra/dnd_wizard.git
   cd dnd_wizard

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
   
7. Load Initial Data:
   
   Before starting, load the initial data into your server database using the following Django command:
   
   ```bash
   python manage.py loaddata data.json
   ```
   
   This command will populate your database with the data from the specified JSON file.
   
9. Start the development server
    ```bash
    python manage.py runserver
