from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from todos.models import Todo
from todos.serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    authentication_classes = []
    permission_classes = [AllowAny]