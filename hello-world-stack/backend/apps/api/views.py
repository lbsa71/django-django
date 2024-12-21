from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer

class HelloWorldView(APIView):
    def get(self, request):
        message = Message.objects.first()
        if not message:
            message = Message.objects.create(text="Hello World")
        serializer = MessageSerializer(message)
        return Response(serializer.data)
