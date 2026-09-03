import React, { Component } from 'react';
import { todoApi } from './api/todoApi.jsx';

export class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      categoryId: '',
      saving: false,
      error: null,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title.trim();
    if (!title) return;

    this.setState({ saving: true, error: null });

    const payload = {
      title,
      completed: false,
      category: this.state.categoryId || null,
    };

    todoApi
      .create(payload)
      .then((newTodo) => {
        this.props.onTodoAdded(newTodo);
        this.setState({ title: '', categoryId: '', saving: false });
      })
      .catch((error) => this.setState({ error, saving: false }));
  };

  render() {
    const { title, categoryId, saving, error } = this.state;
    const { categories } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Add a new todo..."
          disabled={saving}
          className="todo-input"
        />
        <select
          name="categoryId"
          value={categoryId}
          onChange={this.handleChange}
          disabled={saving}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={saving} className="todo-button">
          {saving ? 'Saving...' : 'Add'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    );
  }
}
