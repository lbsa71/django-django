from django.db import models

class RequestLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.timestamp)
