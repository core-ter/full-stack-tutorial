from rest_framework import viewsets

from notes.models.category import Category
from notes.serializers.category import CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer