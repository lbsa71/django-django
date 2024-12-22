from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, OperationLogViewSet

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'logs', OperationLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
