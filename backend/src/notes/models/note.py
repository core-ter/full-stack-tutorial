from django.db import models

from .base import BaseModel

class Note(BaseModel):
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.ForeignKey(
        'notes.Category',
        on_delete=models.CASCADE,
        related_name='notes',
        null=True,
        blank=True)

    def __str__(self):
        return self.title