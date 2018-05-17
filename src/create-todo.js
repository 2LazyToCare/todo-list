import React from "react";
import PropTypes from 'prop-types';
import "./TodoList.css";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";

export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.input = "";
  };

  renderError() {
    const error = !this.state.error ? null : (
      <div style={{ color: "red" }}>{this.state.error}</div>
    );
    return error;
  };
  
  validateInput(task) {
    const errorMessages = !task
      ? "Por favor introduzir uma tarefa."
      : this.props.todos.find(todo => todo.task === task)
        ? "Tarefa já existe."
        : null;
    return errorMessages;
  };

  handleCreate = event => {
    event.preventDefault();
    const task = this.input.value;
    const validateInput = this.validateInput(task);
    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }
    this.setState({ error: null });
    this.props.createTask(task);
    this.input.value = "";.
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleCreate}>
          <input
            type="text"
            placeholder="Introduzir tarefa"
            ref={node => {
              this.input = node;
            }}
          />
          <button>
            <FaPlusCircle />
          </button>
          {this.renderError()}
        </form>
      </div>
    );
  }
}

createTodo.propTypes = {
  createTask: PropTypes.func,
  todos.PropTypes.array
};
