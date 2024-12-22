from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class OperationLog(models.Model):
    OPERATION_CHOICES = [
        ('CREATE', 'Create'),
        ('READ', 'Read'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
    ]

    timestamp = models.DateTimeField(auto_now_add=True)
    operation = models.CharField(max_length=6, choices=OPERATION_CHOICES)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    details = models.TextField()

    def __str__(self):
        return f"{self.operation} - {self.timestamp}"
