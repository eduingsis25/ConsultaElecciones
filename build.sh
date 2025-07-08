#!/usr/bin/env bash
# exit on error
set -o errexit

# poetry install 
pip install -r requirements.txt

# Run migrations
python manage.py migrate