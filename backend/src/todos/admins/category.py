from django.contrib import admin
from todos.models.category import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name',)
