import React, { Component } from 'react';
import { DeleteNote } from './DeleteNote.jsx';

export class NoteItem extends Component {
  render() {
    const { note, onDeleted } = this.props;

    return (
      <li className="note-item">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        {note.category_name && <small>Category: {note.category_name}</small>}
        <DeleteNote note={note} onDeleted={onDeleted} />
      </li>
    );
  }
}
