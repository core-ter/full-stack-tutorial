import React, { Component } from 'react';
import { CheckTodo } from './CheckTodo';

export class TodoItem extends Component {
  handleToggle = () => {
    const { todo, onToggle } = this.props;
    if (onToggle) {
      onToggle(todo);
    }
  };

  render() {
    const { todo } = this.props;

    return (
      <li className={todo.completed ? 'completed' : ''}>
        <CheckTodo completed={todo.completed} onChange={this.handleToggle} />
        {' '}{todo.title}
      </li>
    );
  }
}
