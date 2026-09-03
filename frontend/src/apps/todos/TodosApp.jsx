import React, { Component } from 'react';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';
import { PdfExportModal } from './PdfExportModal';
import { todoApi } from './api/todoApi.jsx';
import { categoryApi } from './api/categoryApi.jsx';
import './styles/todos.css';

export class TodosApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      categories : [],
      loadingTodos: false,
      loadingCategories: false,
      error: null,
      filter : 'all', // 'all' | 'completed' | 'pending'
      isExportModalOpen: false,
    };
  }

  componentDidMount() {
    this.loadTodos();
    this.loadCategories();
  }

  loadTodos = () => {
    this.setState({ loadingTodos: true, error: null });

    todoApi
      .getAll(this.state.filter === 'all' ? null : this.state.filter)
      .then((todos) => this.setState({ todos, loadingTodos: false }))
      .catch((error) => this.setState({ error, loadingTodos: false }));
  };

  loadCategories = () => {
    this.setState({ loadingCategories: true, error: null });

    categoryApi
      .getAll()
      .then((categories) => this.setState({ categories, loadingCategories: false }))
      .catch((error) => this.setState({ error, loadingCategories: false }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter }, this.loadTodos)
  };

  handleOpenExportModal = () => {
    this.setState({ isExportModalOpen: true });
  };

  handleCloseExportModal = () => {
    this.setState({ isExportModalOpen: false });
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
    const { todos, categories, loadingTodos,  error, isExportModalOpen } = this.state;

    return (
      <section className="todos-app">
        <h2>Todos</h2>

        <div className="todo-filter">
          {['all', 'pending', 'completed'].map((value) => (
            <button
              key={value}
              className={this.state.filter === value ? 'active' : ''}
              onClick={() => this.handleFilterChange(value)}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>

        <div className="export-section">
          <button className="todo-button" onClick={this.handleOpenExportModal}>
            Export PDF
          </button>
        </div>

        <AddTodoForm onTodoAdded={this.handleTodoAdded} categories={categories} />
        {error && <p className="error">Error: {error}</p>}
        <TodoList todos={todos} loading={loadingTodos} onTodoToggle={this.handleTodoToggle} />

        {isExportModalOpen && (
          <PdfExportModal
            initialFilter={this.state.filter}
            onClose={this.handleCloseExportModal}
          />
        )}
      </section>
    );
  }
}
