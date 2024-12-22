from rest_framework import viewsets
from rest_framework.response import Response
from .models import Customer, OperationLog
from .serializers import CustomerSerializer, OperationLogSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def _log_operation(self, operation, customer=None, details=""):
        OperationLog.objects.create(
            operation=operation,
            customer=customer,
            details=details
        )

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        self._log_operation('READ', details="Listed all customers")
        return response

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        customer = self.get_object()
        self._log_operation('READ', customer, f"Retrieved customer {customer.name}")
        return response

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        customer = Customer.objects.get(id=response.data['id'])
        self._log_operation('CREATE', customer, f"Created customer {customer.name}")
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        customer = self.get_object()
        self._log_operation('UPDATE', customer, f"Updated customer {customer.name}")
        return response

    def destroy(self, request, *args, **kwargs):
        customer = self.get_object()
        customer_name = customer.name
        response = super().destroy(request, *args, **kwargs)
        self._log_operation('DELETE', None, f"Deleted customer {customer_name}")
        return response

class OperationLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OperationLog.objects.all().order_by('-timestamp')
    serializer_class = OperationLogSerializer
