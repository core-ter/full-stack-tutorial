import React, { Component } from 'react';

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

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/todos/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const newTodo = JSON.parse(xhr.responseText);
          this.props.onTodoAdded(newTodo);
          this.setState({ title: '', saving: false });
        } catch (parseError) {
          this.setState({ error: parseError.message, saving: false });
        }
      } else {
        this.setState({
          error: `HTTP error! status: ${xhr.status}`,
          saving: false,
        });
      }
    };

    xhr.onerror = () => {
      this.setState({ error: 'Network error', saving: false });
    };

    xhr.send(JSON.stringify({ title, completed: false }));
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
