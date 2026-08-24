import React, { Component } from 'react';

export class NoteItem extends Component {
  render() {
    const { note } = this.props;

    return (
      <li className="note-item">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        {note.category_name && <small>Category: {note.category_name}</small>}
      </li>
    );
  }
}
