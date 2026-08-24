from rest_framework import serializers
from notes.models.note import Note

class NoteSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'category', 'category_name', 'created_at', 'updated_at']