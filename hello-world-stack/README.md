# Hello World Full-Stack Application

A complete full-stack application with React frontend, Django backend, and PostgreSQL database, deployed on Kubernetes.

## Project Structure

```
hello-world-stack/
├── backend/             # Django backend
│   ├── apps/           # Django apps
│   │   └── api/        # API app
│   ├── config/         # Django settings
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/           # React frontend
│   ├── src/           # React source code
│   ├── public/        # Static files
│   ├── Dockerfile
│   └── nginx.conf
└── k8s/               # Kubernetes manifests
    ├── postgres.yaml
    ├── backend.yaml
    └── frontend.yaml
```

## Prerequisites

- Docker
- Kubernetes cluster (e.g., minikube, Docker Desktop Kubernetes)
- kubectl CLI tool

## Building the Images

1. Build the backend image:
```bash
cd backend
docker build -t hello-world-backend:latest .
```

2. Build the frontend image:
```bash
cd frontend
docker build -t hello-world-frontend:latest .
```

## Deploying to Kubernetes

1. Create PostgreSQL deployment:
```bash
kubectl apply -f k8s/postgres.yaml
```

2. Create backend deployment:
```bash
kubectl apply -f k8s/backend.yaml
```

3. Create frontend deployment and ingress:
```bash
kubectl apply -f k8s/frontend.yaml
```

4. Wait for all pods to be ready:
```bash
kubectl get pods -w
```

## Accessing the Application

The application will be available through the Ingress controller:

- Frontend: http://localhost/
- API: http://localhost/api/hello/

## Development

### Backend

1. Install dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py migrate
```

3. Start development server:
```bash
python manage.py runserver
```

### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

## Architecture

- Frontend: React with TypeScript
- Backend: Django with Django REST Framework
- Database: PostgreSQL
- Deployment: Kubernetes with Nginx Ingress
