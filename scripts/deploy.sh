kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl get pods

kubectl exec -it $(kubectl get pod -l app=backend -o jsonpath="{.items[0].metadata.name}") -- python manage.py migrate