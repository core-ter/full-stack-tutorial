import React, { Component } from 'react';

export class PdfExportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: props.initialFilter || 'all',
      loading: false,
      error: null,
    };
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  getPreviewUrl() {
    const { filter } = this.state;
    return filter === 'all'
      ? '/api/todos/todos/pdf/'
      : `/api/todos/todos/pdf/?status=${filter}`;
  }

  handlePreview = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(this.getPreviewUrl());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { onClose } = this.props;
    const { filter, loading, error } = this.state;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>Export Todos to PDF</h3>

          <label htmlFor="pdf-filter">Filter:</label>
          <select
            id="pdf-filter"
            value={filter}
            onChange={this.handleFilterChange}
            disabled={loading}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          {error && <p className="error">Error: {error}</p>}

          <div className="modal-actions">
            <button
              className="todo-button"
              onClick={this.handlePreview}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Preview PDF'}
            </button>
            <button className="todo-button secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
