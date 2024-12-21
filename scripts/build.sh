cd hello-world-stack

cd backend
docker build -t hello-world-backend:latest .
cd ..

kubectl delete deployment backend
kubectl apply -f k8s/backend.yaml

cd frontend
docker build -t hello-world-frontend:latest .
cd ..
