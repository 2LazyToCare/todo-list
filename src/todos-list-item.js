import React from "react";
import PropTypes from "prop-types";
import "./TodoList.css";
import Certo from "react-icons/lib/fa/check-square-o";
import Quadrado from "react-icons/lib/fa/square-o";
import Apagar from "react-icons/lib/fa/trash-o";
import Cancelar from "react-icons/lib/fa/times-circle";
import Guardar from "react-icons/lib/fa/refresh";
import Editar from "react-icons/lib/fa/pencil";

export default class TodosListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: this.props.todo.task,
      error: null
    };
  }

  onDeleteClick = () => {
    const { key } = this.props.todo;
    this.props.deleteTask(key);
  };

  onEditClick = () => {
    this.setState({ isEditing: true });
  };

  onCancelClick = () => {
    this.setState({
      isEditing: false,
      error: null,
      value: this.props.todo.task
    });
  };

  validateEdit = value => {
    const editErrors =
      value.length === 0
        ? "Tarefa não pode estar vazia."
        : this.props.todos.find(todo => todo.task === value)
          ? "Tarefa já existe."
          : null;
    return editErrors;
  };

  renderError() {
    const error = !this.state.error ? null : (
      <div style={{ color: "red" }}>{this.state.error}</div>
    );
    return error;
  }

  onSaveClick = event => {
    event.preventDefault();
    const oldTask = this.props.todo;
    const newTask = this.state.value;
    const validateTask = this.validateEdit(newTask);
    this.props.saveTask(oldTask, newTask);
    if (this.props.todo.task !== newTask && validateTask) {
      this.setState({
        isEditing: true,
        error: validateTask
      });
    } else if (this.props.todo.task !== newTask && !validateTask) {
      this.setState({
        isEditing: false,
        isCompleted: (this.props.todo.isCompleted = false),
        error: null
      });
    } else {
      this.setState({
        isEditing: false,
        isCompleted: this.props.isCompleted,
        error: null
      });
    }
  };

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td className="editButtons">
          <button onClick={this.onSaveClick}>
            <Guardar />
          </button>
          <button onClick={this.onCancelClick}>
            <Cancelar />
          </button>
        </td>
      );
    } else {
      return (
        <td className="buttons">
          <button onClick={this.onEditClick}>
            <Editar />
          </button>
          <button onClick={this.onDeleteClick}>
            <Apagar />
          </button>
        </td>
      );
    }
  }

  renderTaskSection() {
    const { task, isCompleted } = this.props.todo;
    const taskStyle = {
      color: isCompleted ? "green" : "red",
      cursor: "pointer"
    };
    if (this.state.isEditing) {
      return (
        <td>
          <form className="editForm" onSubmit={this.onSaveClick}>
            {this.renderError()}
            <input
              type="text"
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </form>
        </td>
      );
    } else if (isCompleted === true) {
      return (
        <td
          style={taskStyle}
          onClick={() => this.props.toggleTask(this.props.todo)}
          className="items"
        >
          <Certo /> {task}
        </td>
      );
    } else {
      return (
        <td
          style={taskStyle}
          onClick={() => this.props.toggleTask(this.props.todo)}
          className="items"
        >
          <Quadrado /> {task}
        </td>
      );
    }
  }

  render() {
    return (
      <tr className="listItems">
        {this.renderTaskSection()}
        {this.renderActionsSection()}
      </tr>
    );
  }
}

TodosListItem.propTypes = {
  todos: PropTypes.array,
  todo: PropTypes.object,
  isCompleted: PropTypes.bool,
  deleteTask: PropTypes.func,
  saveTask: PropTypes.func,
  toggleTask: PropTypes.func
};
