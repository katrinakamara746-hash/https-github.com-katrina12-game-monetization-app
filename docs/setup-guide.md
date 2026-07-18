# Setup Guide

## Prerequisites

- Docker & Docker Compose
- Git
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/katrinakamara746-hash/https-github.com-katrina12-game-monetization-app.git
cd https-github.com-katrina12-game-monetization-app
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` and configure your settings:
- Database credentials
- API keys (Stripe, Google Play, App Store)
- JWT secret
- Email configuration

### 3. Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Database Setup

```bash
# Run migrations
docker-compose exec backend alembic upgrade head

# Create initial admin user
docker-compose exec backend python scripts/create_admin.py
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Database: localhost:5432

## Local Development (Without Docker)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Database Management

### Create a new migration

```bash
alembic revision --autogenerate -m "Add new table"
```

### Apply migrations

```bash
alembic upgrade head
```

### Rollback migrations

```bash
alembic downgrade -1
```

## Testing

### Run all tests

```bash
docker-compose exec backend pytest
docker-compose exec frontend npm test
```

### Run specific tests

```bash
pytest tests/api/test_auth.py
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres
```

### Clear Docker Resources

```bash
# Remove all stopped containers
docker-compose down -v

# Rebuild images
docker-compose up --build
```
