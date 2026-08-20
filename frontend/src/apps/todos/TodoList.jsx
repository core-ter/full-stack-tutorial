import React from 'react';
import { TodoItem } from './TodoItem';

export function TodoList({ todos, loading }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (todos.length === 0) {
    return <p>No todos yet.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
