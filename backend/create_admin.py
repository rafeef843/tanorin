import os
import django

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tanorin_backend.settings")
django.setup()

from django.contrib.auth import get_user_model

def create_or_reset_admin():
    User = get_user_model()
    username = "admin"
    password = "password123"
    email = "admin@tanorin.com"

    try:
        if not User.objects.filter(username=username).exists():
            print(f"Creating superuser: {username}")
            User.objects.create_superuser(username, email, password)
            print(f"Superuser '{username}' created successfully.")
        else:
            print(f"Superuser '{username}' already exists. Resetting password.")
            u = User.objects.get(username=username)
            u.set_password(password)
            u.is_superuser = True
            u.is_staff = True
            u.save()
            print(f"Password for '{username}' has been reset to '{password}'.")
    except Exception as e:
        print(f"Error creating/resetting superuser: {e}")

if __name__ == "__main__":
    create_or_reset_admin()
