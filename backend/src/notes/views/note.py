from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from notes.models.note import Note
from notes.serializers.note import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    authentication_classes = []
    permission_classes = [AllowAny]