I have set up my development environment for a 'Hello World' full-stack application with this structure:
Frontend at: hello-world-stack/frontend (created with create-react-app --template typescript)
Backend at: hello-world-stack/backend with:

Virtual environment in backend/venv
Django project configuration in backend/config
Django apps directory at backend/apps
API app at backend/apps/api

Please help me create a complete 'Hello World' application where:

The React frontend displays 'Hello World' from the backend API
The Django backend has a simple REST endpoint returning the message
The data is stored in PostgreSQL
Everything runs in Kubernetes

I need:

React frontend code (components, services, types)
Django backend code (models, views, serializers, URLs, settings adjustments)
PostgreSQL schema and connection configuration
Kubernetes deployment, service, and ingress configurations