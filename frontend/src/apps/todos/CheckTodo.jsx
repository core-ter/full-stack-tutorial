import React, { Component } from 'react';

export class CheckTodo extends Component {
  handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange();
    }
  };

  render() {
    const { completed } = this.props;

    return (
      <input
        type="checkbox"
        checked={completed}
        onChange={this.handleChange}
        disabled={completed}
      />
    );
  }
}

