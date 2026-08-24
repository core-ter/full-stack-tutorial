import React, { Component } from 'react';
import { todoApi } from './api/todoApi';

export class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      saving: false,
      error: null,
    };
  }

  handleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title.trim();
    if (!title) return;

    this.setState({ saving: true, error: null });

    todoApi
      .create({ title, completed: false })
      .then((newTodo) => {
        this.props.onTodoAdded(newTodo);
        this.setState({ title: '', saving: false });
      })
      .catch((error) => this.setState({ error, saving: false }));
  };

  render() {
    const { title, saving, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={this.handleChange}
          placeholder="Add a new todo..."
          disabled={saving}
          className="todo-input"
        />
        <button type="submit" disabled={saving} className="todo-button">
          {saving ? 'Saving...' : 'Add'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    );
  }
}
