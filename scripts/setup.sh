#!/bin/zsh
source ~/.zshrc

# mkdir hello-world-stack
cd hello-world-stack

# Create frontend directory and initialize React with TypeScript
#npx create-react-app frontend --template typescript
#cd frontend
#npm install axios # for API calls
#cd ..
# Create backend directory and set up Django

mkdir backend
cd backend

# Setup virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers psycopg2-binary
pip freeze > requirements.txt

# Create the project with name 'config'
django-admin startproject config .

# Create the apps directory and api app
mkdir apps
cd apps
django-admin startapp api

# brew services start postgresql@14
# createdb hello_world_db
