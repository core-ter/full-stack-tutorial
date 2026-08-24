import React, { Component } from 'react';
import { TodoItem } from './TodoItem';

export class TodoList extends Component {
  render() {
    const { todos, loading } = this.props;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (todos.length === 0) {
      return <p>No todos yet.</p>;
    }

    const { onTodoToggle } = this.props;

    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onTodoToggle} />
        ))}
      </ul>
    );
  }
}
