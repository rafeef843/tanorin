#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip
pip install --no-cache-dir -r requirements.txt

# Verify gunicorn is installed
which gunicorn || echo "Gunicorn not found in PATH"
gunicorn --version || echo "Gunicorn command failed"

python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
