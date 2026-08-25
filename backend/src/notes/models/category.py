from django.db import models

from mysite.models import BaseModel

class Category(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.name