#!/usr/bin/env bash
# exit on error
set -o errexit

python3 -m pip install --upgrade pip
python3 -m pip install --no-cache-dir -r requirements.txt

# Verify gunicorn is installed
which gunicorn || echo "Gunicorn not found in PATH"
python3 -m gunicorn --version || echo "Gunicorn module check failed"

python3 manage.py collectstatic --no-input
python3 manage.py makemigrations
python3 manage.py migrate
