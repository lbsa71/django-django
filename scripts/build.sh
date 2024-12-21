cd hello-world-stack

cd backend
docker build -t hello-world-backend:latest .
cd ..

cd frontend
docker build -t hello-world-frontend:latest .
cd ..
