import io

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.http import FileResponse

from todos.models import Todo
from todos.serializers import TodoSerializer
from todos.services.pdf_generator import TodoPdfGenerator
from todos.services.pdf_converter import TodoPdfConverter


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

    def get_queryset(self):
        status = self.request.query_params.get('status')
        if status == 'completed':
            return Todo.todos.completed()
        elif status == 'pending':
            return Todo.todos.pending()
        return Todo.objects.all()

    @action(detail=False, methods=['get'])
    def pdf(self, request):
        status = request.query_params.get('status')
        generator = TodoPdfGenerator(status=status)
        context = generator.build_context()
        converter = TodoPdfConverter(context)
        pdf_bytes = converter.convert_to_pdf()
        return FileResponse(
            io.BytesIO(pdf_bytes),
            as_attachment=False,
            filename='todos.pdf',
            content_type='application/pdf',
        )
