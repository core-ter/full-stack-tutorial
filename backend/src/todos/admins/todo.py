from django.contrib import admin
from todos.models.todo import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'completed', 'created_at', 'updated_at')
    list_filter = ('category', 'completed', 'created_at', 'updated_at')
    search_fields = ('title',)