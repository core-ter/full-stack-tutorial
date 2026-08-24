import React, { Component } from 'react';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';
import { todoApi } from './api/todoApi.jsx';
import { categoryApi } from './api/categoryApi.jsx';
import './styles/todos.css';

export class TodosApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      categories : [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadTodos();
    this.loadCategories();
  }

  loadTodos = () => {
    this.setState({ loading: true, error: null });

    todoApi
      .getAll()
      .then((todos) => this.setState({ todos, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  };

  loadCategories = () => {
    this.setState({ loading: true, error: null });

    categoryApi
      .getAll()
      .then((categories) => this.setState({ categories, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  };

  handleTodoAdded = (newTodo) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  handleTodoToggle = (todo) => {
    const updatedFields = { completed: !todo.completed };

    todoApi
      .update(todo.id, updatedFields)
      .then((savedTodo) => {
        this.setState((prevState) => ({
          todos: prevState.todos.map((item) =>
            item.id === savedTodo.id ? savedTodo : item
          ),
        }));
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    const { todos, categories, loading, error } = this.state;

    return (
      <section className="todos-app">
        <h2>Todos</h2>
        <AddTodoForm onTodoAdded={this.handleTodoAdded} categories={categories} />
        {error && <p className="error">Error: {error}</p>}
        <TodoList todos={todos} loading={loading} onTodoToggle={this.handleTodoToggle} />
      </section>
    );
  }
}
