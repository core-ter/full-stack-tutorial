from todos.models import Todo


class TodoPdfGenerator:
    def __init__(self, status=None):
        self.status = status

    def get_filter_label(self):
        if self.status == 'completed':
            return 'Completed todos'
        if self.status == 'pending':
            return 'Pending todos'
        return 'All todos'

    def get_queryset(self):
        if self.status == 'completed':
            return Todo.todos.completed()
        if self.status == 'pending':
            return Todo.todos.pending()
        return Todo.objects.all()

    def build_context(self):
        todos = self.get_queryset().select_related('category').order_by('-created_at')

        todo_data = []
        for todo in todos:
            todo_data.append({
                'title': todo.title,
                'category': todo.category.name if todo.category else '-',
                'completed': todo.completed,
                'created_at': todo.created_at.strftime('%Y-%m-%d %H:%M'),
            })

        return {
            'todos': todo_data,
            'filter_label': self.get_filter_label(),
        }
