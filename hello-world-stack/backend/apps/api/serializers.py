from rest_framework import serializers
from .models import Customer, OperationLog

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class OperationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperationLog
        fields = ['id', 'timestamp', 'operation', 'customer', 'details']
        read_only_fields = ['timestamp']
