kubectl delete deployment backend
kubectl delete deployment frontend

kubectl apply -f hello-world-stack/k8s/postgres.yaml
kubectl apply -f hello-world-stack/k8s/backend.yaml
kubectl apply -f hello-world-stack/k8s/frontend.yaml
kubectl apply -f hello-world-stack/k8s/ingress.yaml
kubectl get pods -w

# kubectl exec -it $(kubectl get pod -l app=backend -o jsonpath="{.items[0].metadata.name}") -- python manage.py migrate