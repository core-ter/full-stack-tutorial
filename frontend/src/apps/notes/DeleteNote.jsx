import React, { Component } from 'react';
import { noteApi } from './api/noteApi.jsx';

export class DeleteNote extends Component {
  constructor(props) {
    super(props);
    this.state = { deleting: false };
  }

  handleDelete = () => {
    const { note, onDeleted } = this.props;
    if (!window.confirm(`Delete note "${note.title}"?`)) return;

    this.setState({ deleting: true });
    noteApi
      .delete(note.id)
      .then(() => {
        if (onDeleted) onDeleted(note.id);
      })
      .catch((error) => {
        alert(`Failed to delete note: ${error}`);
        this.setState({ deleting: false });
      });
  };

  render() {
    const { deleting } = this.state;

    return (
      <button
        className="note-delete-button"
        onClick={this.handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    );
  }
}