from django.db import models

from todos.models.models import BaseModel
from todos.models.category import Category

class Todo(BaseModel):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='todos',
        null=True,
        blank=True)
    completed = models.BooleanField(default=False)