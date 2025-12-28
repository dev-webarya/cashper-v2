# =====================================================
# CASHPER - Multi-stage Dockerfile for Frontend & Backend
# =====================================================

# =====================================================
# STAGE 1: Build Frontend
# =====================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY cashper_frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source
COPY cashper_frontend/ ./

# Build for production
RUN npm run build

# =====================================================
# STAGE 2: Backend Base
# =====================================================
FROM python:3.11-slim AS backend

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libffi-dev \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY cashper_backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir uvicorn gunicorn

# Copy backend code
COPY cashper_backend/ ./backend/

# Copy frontend build from stage 1
COPY --from=frontend-builder /app/frontend/dist /var/www/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/sites-enabled/default

# Copy supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 80

# Start supervisor (manages both nginx and backend)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
