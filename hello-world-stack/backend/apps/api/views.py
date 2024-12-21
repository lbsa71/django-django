from rest_framework.views import APIView
from rest_framework.response import Response
from .models import RequestLog
from .serializers import RequestLogSerializer

class HelloWorldView(APIView):
    def get(self, request):
        # Log this request
        RequestLog.objects.create()
        
        # Get all logs ordered by timestamp
        logs = RequestLog.objects.all().order_by('-timestamp')
        serializer = RequestLogSerializer(logs, many=True)
        
        return Response({
            'message': 'Hello World',
            'access_logs': serializer.data
        })
