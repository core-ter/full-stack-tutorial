import React, { Component } from 'react';
import { TodosApp } from './apps/todos';
import { NotesApp } from './apps/notes';

const APPS = [
  { id: 'todos', label: 'Todos', component: TodosApp },
  { id: 'notes', label: 'Notes', component: NotesApp },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeApp: 'todos' };
  }

  handleAppChange = (appId) => {
    this.setState({ activeApp: appId });
  };

  render() {
    const { activeApp } = this.state;
    const ActiveComponent = APPS.find((app) => app.id === activeApp).component;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Full Stack Tutorial</h1>
        </header>
        <div className="app-layout">
          <aside className="app-sidebar">
            <nav>
              {APPS.map((app) => (
                <button
                  key={app.id}
                  className={`app-nav-button ${app.id === activeApp ? 'active' : ''}`}
                  onClick={() => this.handleAppChange(app.id)}
                >
                  {app.label}
                </button>
              ))}
            </nav>
          </aside>
          <main className="app-main">
            <ActiveComponent />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
