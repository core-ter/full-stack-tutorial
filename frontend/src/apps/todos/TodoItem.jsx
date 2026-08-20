import React from 'react';

export function TodoItem({ todo }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      {todo.completed ? '✅' : '⬜'} {todo.title}
    </li>
  );
}
