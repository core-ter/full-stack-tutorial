import React, { Component } from 'react';
import { TodosApp } from './apps/todos';
import { NotesApp } from './apps/notes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Full Stack Tutorial</h1>
        </header>
        <main>
          <TodosApp />
          <NotesApp />
        </main>
      </div>
    );
  }
}

export default App;
