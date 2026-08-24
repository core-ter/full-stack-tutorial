import React, { Component } from 'react';
import { NoteItem } from './NoteItem';

export class NoteList extends Component {
  render() {
    const { notes, loading } = this.props;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (notes.length === 0) {
      return <p>No notes yet.</p>;
    }

    return (
      <ul className="note-list">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    );
  }
}
