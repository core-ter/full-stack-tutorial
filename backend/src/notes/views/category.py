from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from notes.models.category import Category
from notes.serializers.category import CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = []
    permission_classes = [AllowAny]