# Cashper Docker Deployment Guide

## Project Structure (Single Container Setup)
```
full_proj/
├── Dockerfile           # Multi-stage build (frontend + backend)
├── docker-compose.yml   # Single service configuration
├── nginx.conf           # Nginx config for container
├── supervisord.conf     # Process manager config
├── .dockerignore
├── cashper_backend/
│   ├── .env             # Backend environment variables
│   └── ...
└── cashper_frontend/
    └── ...
```

## Single Container Benefits
✅ One container to manage  
✅ Single port exposure (3000)  
✅ Built-in Nginx + API proxy  
✅ Easy deployment & updates  

---

## Step 1: Push to GitHub (Local Machine)

```bash
cd "C:\Users\Ajay Gupta\Downloads\full_proj (3)\full_proj"

git init
git add .
git commit -m "Add Docker configuration"
git remote add origin https://github.com/YOUR_USERNAME/cashper.git
git push -u origin main
```

---

## Step 2: SSH to VPS & Pull Code

```bash
ssh root@93.127.194.118

cd /home
git clone https://github.com/YOUR_USERNAME/cashper.git
cd cashper
```

---

## Step 3: Configure Backend Environment

```bash
nano cashper_backend/.env
```

Ensure production settings:
```env
MONGO_URL=mongodb+srv://...
SECRET_KEY=your-super-secret-production-key
DISABLE_AUTH_FOR_TESTING=false
GMAIL_USER=kumuyadav249@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

---

## Step 4: Build & Run (Single Command!)

```bash
docker-compose up -d --build
```

That's it! Your app is now running on port **3000**.

---

## Step 5: Configure Host Nginx (Reverse Proxy)

```bash
nano /etc/nginx/sites-available/cashper
```

```nginx
server {
    listen 80;
    server_name cashper.ai www.cashper.ai;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable & restart:
```bash
ln -sf /etc/nginx/sites-available/cashper /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## Step 6: SSL Certificate

```bash
certbot --nginx -d cashper.ai -d www.cashper.ai
```

---

## Quick Commands

| Action | Command |
|--------|---------|
| Start | `docker-compose up -d` |
| Stop | `docker-compose down` |
| Rebuild | `docker-compose up -d --build` |
| Logs | `docker-compose logs -f` |
| Shell | `docker exec -it cashper-app bash` |
| Backend logs | `docker exec cashper-app tail -f /var/log/backend.log` |

---

## Update Deployment

```bash
cd /home/cashper
git pull origin main
docker-compose up -d --build
```

---

## Verify

```bash
# Check container
docker-compose ps

# Test locally
curl http://localhost:3000
curl http://localhost:3000/api/

# Test domain
curl https://cashper.ai
```
