from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from todos.models import Todo
from todos.serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer

    def get_queryset(self):
        status = self.request.query_params.get('status')
        if status == 'completed':
            return Todo.todos.completed()
        elif status == 'pending':
            return Todo.todos.pending()
        return Todo.objects.all()

    authentication_classes = []
    permission_classes = [AllowAny]