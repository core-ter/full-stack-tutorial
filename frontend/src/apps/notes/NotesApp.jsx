import React, { Component } from 'react';
import { AddNoteForm } from './AddNoteForm';
import { NoteList } from './NoteList';
import { noteApi } from './api/noteApi.jsx';
import { categoryApi } from './api/categoryApi.jsx';
import './styles/notes.css';

export class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      categories : [],
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.loadNotes();
    this.loadCategories();
  }

  loadNotes = () => {
    this.setState({ loading: true, error: null });
    noteApi.getAll()
      .then((notes) => this.setState({ notes, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  }

  loadCategories = () => {
    this.setState({ loading: true, error: null });
    categoryApi.getAll()
      .then((categories) => this.setState({ categories, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  }

  handleNoteAdded = (newNote) => {
    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  }

  handleNoteDeleted = (deletedId) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== deletedId),
    }));
  }

  render() {
    const { notes, categories, loading, error } = this.state;

    return (
      <div className="notes-app">
        <h1>Notes</h1>
        {error && <div className="error">Error: {error}</div>}
        {loading && <div className="loading">Loading...</div>}
        <AddNoteForm categories={categories} onNoteAdded={this.handleNoteAdded} />
        <NoteList notes={notes} loading={loading} onNoteDeleted={this.handleNoteDeleted} />
      </div>
    )
  }
}