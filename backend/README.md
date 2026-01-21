# Tanorin Backend Setup

## Prerequisites

- Python 3.10+
- MySQL Server

## Configuration

1. **Database Setup**:
   Access your MySQL server and create the database:

   ```sql
   CREATE DATABASE tanorin_db CHARACTER SET utf8mb4;
   ```

2. **Credentials**:
   Open `tanorin_backend/settings.py` and find the `DATABASES` section.
   Update the `PASSWORD` field with your MySQL root password (or user password).

## Installation

```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Running the App

1. **Apply Migrations**:

   ```bash
   python manage.py migrate
   ```

2. **Create Admin User**:

   ```bash
   python manage.py createsuperuser
   ```

3. **Start Server**:

   ```bash
   python manage.py runserver
   ```

4. **Access Admin Panel**:
   Go to `http://localhost:8000/admin` to manage Categories and Products.

## API Endpoints

- Categories: `http://localhost:8000/api/categories/`
- Products: `http://localhost:8000/api/products/`
