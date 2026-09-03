import React, { Component } from 'react';
import { noteApi } from './api/noteApi.jsx';

export class AddNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
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
    const content = this.state.content.trim();
    if (!title) return;

    this.setState({ saving: true, error: null });

    const payload = {
      title,
      content,
      category: this.state.categoryId || null,
    };

    noteApi
      .create(payload)
      .then((newNote) => {
        this.props.onNoteAdded(newNote);
        this.setState({ title: '', content: '', categoryId: '', saving: false });
      })
      .catch((error) => this.setState({ error, saving: false }));
  };

  render() {
    const { title, content, categoryId, saving, error } = this.state;
    const { categories } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="note-form">
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Add a new note title..."
          disabled={saving}
          className="note-input"
        />
        <textarea
          name="content"
          value={content}
          onChange={this.handleChange}
          placeholder="Add note content..."
          disabled={saving}
          className="note-textarea"
          rows="3"
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
        <button type="submit" disabled={saving} className="note-button">
          {saving ? 'Saving...' : 'Add'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    );
  }
}
