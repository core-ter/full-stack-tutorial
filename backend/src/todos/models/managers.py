from django.db import models

class TodoQuerySet(models.QuerySet):
    def completed(self):
        return self.filter(completed=True)

    def pending(self):
        return self.filter(completed=False)

class TodoManager(models.Manager):
    def get_queryset(self):
        return TodoQuerySet(self.model, using=self._db)

    def completed(self):
        return self.get_queryset().completed()

    def pending(self):
        return self.get_queryset().pending()