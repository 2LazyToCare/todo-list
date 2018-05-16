import React from "react";
import "./TodoList.css";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";

export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  renderError() {
    if (!this.state.error) {
      return null;
    }

    return <div style={{ color: "red" }}>{this.state.error}</div>;
  }

  handleCreate = event => {
    event.preventDefault();

    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    this.setState({ error: null });
    this.props.createTask(task);
    this.refs.createInput.value = ""; // Esvazia o form depois de uma tarefa ser adicionada.
  };

  validateInput(task) {
    if (!task) {
      return "Por favor introduzir uma tarefa.";
    } else if (this.props.todos.find(todo => todo.task === task)) {
      return "Tarefa já existe.";
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleCreate}>
          <input
            type="text"
            placeholder="Introduzir tarefa"
            ref="createInput"
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