import React, { Component } from 'react';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';
import './todos.css';

export class TodosApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    this.setState({ loading: true, error: null });

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/todos/', true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const todos = JSON.parse(xhr.responseText);
          this.setState({ todos, loading: false });
        } catch (parseError) {
          this.setState({ error: parseError.message, loading: false });
        }
      } else {
        this.setState({
          error: `HTTP error! status: ${xhr.status}`,
          loading: false,
        });
      }
    };

    xhr.onerror = () => {
      this.setState({ error: 'Network error', loading: false });
    };

    xhr.send();
  };

  handleTodoAdded = (newTodo) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    const { todos, loading, error } = this.state;

    return (
      <section className="todos-app">
        <h2>Todos</h2>
        <AddTodoForm onTodoAdded={this.handleTodoAdded} />
        {error && <p className="error">Error: {error}</p>}
        <TodoList todos={todos} loading={loading} />
      </section>
    );
  }
}
