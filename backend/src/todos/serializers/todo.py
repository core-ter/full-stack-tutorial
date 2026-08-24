from rest_framework import serializers

from ..models import Todo

class TodoSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Todo
        fields = ['id', 'title', 'completed', 'category', 'category_name', 'created_at', 'updated_at']