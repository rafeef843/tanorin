---
description: Deploy Tanorin to Render.com (Frontend + Backend + DB)
---

# Deploying to Render.com

This guide will help you deploy the Django backend (with MySQL/Postgres) and React frontend to Render.com for free.

## Prerequisites

1.  **GitHub Account**: Your code must be pushed to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).

---

## Part 1: Database (PostgreSQL)

Since Render's native MySQL isn't always free or easy to set up for free tier, we will use **PostgreSQL** (free tier available).

1.  Click **New +** -> **PostgreSQL**.
2.  **Name**: `tanorin-db`.
3.  **Database**: `tanorin_db`.
4.  **User**: `admin` (or whatever it generates).
5.  **Region**: `Frankfurt` (or closest to you).
6.  **Instance Type**: `Free`.
7.  Click **Create Database**.
8.  **Copy the "Internal Database URL"** (for later use).

---

## Part 2: Backend (Django)

1.  Click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  **Name**: `tanorin-backend`.
4.  **Region**: Same as Database.
5.  **Branch**: `main`.
6.  **Root Directory**: `backend` (Important!).
7.  **Runtime**: `Python 3`.
8.  **Build Command**: `./build.sh`
9.  **Start Command**: `gunicorn tanorin_backend.wsgi:application`
10. **Environment Variables** (Add these):
    - `PYTHON_VERSION`: `3.11.9` (Recommended stable version)
    - `SECRET_KEY`: (Generate a random string)
    - `DEBUG`: `False`
    - `DATABASE_URL`: (Paste the **Internal Database URL** from Part 1).
    - `RENDER_EXTERNAL_HOSTNAME`: (Leave blank for now, Render adds it automatically, or set to your custom domain).
11. Click **Create Web Service**.
12. Wait for deploy. Copy the **Service URL** (e.g., `https://tanorin-backend.onrender.com`).

---

## Part 3: Frontend (React)

1.  Click **New +** -> **Static Site**.
2.  Connect the same GitHub repository.
3.  **Name**: `tanorin-frontend`.
4.  **Branch**: `main`.
5.  **Root Directory**: `.` (Leave empty or dot).
6.  **Build Command**: `npm install && npm run build`
7.  **Publish Directory**: `dist`
8.  **Environment Variables**:
    - `VITE_API_URL`: (Paste the **Backend Service URL** from Part 2, e.g., `https://tanorin-backend.onrender.com/api`)
9.  Click **Create Static Site**.

---

## Part 4: Final Connection

1.  Go back to the **Backend** service in Render Dashboard.
2.  Add an environment variable:
    - `FRONTEND_URL`: (Paste the **Frontend Service URL**, e.g., `https://tanorin-frontend.onrender.com`).
    - _Note: Remove any trailing slash `/`_.
3.  **Manual Deploy** -> **Clear build cache & deploy** (on Backend) to ensure settings update.

## Troubleshooting

- **Admin Page Error**: If you see `TypeError` on the admin page, ensure `jazzmin` is disabled in `settings.py` or check for compatibility updates.
- **Database**: The build script runs `python manage.py migrate` automatically.
- **Superuser**: To create a superuser on Render:
  1.  Go to the Backend service -> **Shell**.
  2.  Run: `python manage.py createsuperuser`.
