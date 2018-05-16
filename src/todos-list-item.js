import React from "react";
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
      // novas propriedades que serão tratadas nesta secção.
      isEditing: false, // cada item permite editar, ou não.
      value: this.props.todo.task, // cada item possui um value que corresponde à respectiva task.
      error: null
    };
  }

  onDeleteClick = () => {
    const { key } = this.props.todo; // passa props da App para uma nova variável "key".
    this.props.deleteTask(key);
  };

  onEditClick = () => {
    this.setState({ isEditing: true }); // editar torna-se verdade.
  };

  onCancelClick = () => {
    this.setState({
      isEditing: false,
      error: null,
      value: this.props.todo.task
    });
  };

  validateEdit = value => {
    if (value.length === 0) {
      return "Tarefa não pode estar vazia.";
    } else if (this.props.todos.find(todo => todo.task === value)) {
      return "Tarefa já existe.";
    } else {
      return null;
    }
  };

  renderError() {
    if (!this.state.error) {
      return null;
    }

    return <div style={{ color: "red" }}>{this.state.error}</div>;
  }

  onSaveClick = event => {
    event.preventDefault(); // bloqueia o comportamento default do elemento form - reload a página.

    const oldTask = this.props.todo; // nova variável que vai buscar o valor da task à App.
    const newTask = this.state.value; // nova variável que vai buscar o novo valor da task.

    const validateTask = this.validateEdit(newTask);

    this.props.saveTask(oldTask, newTask); // recebe da App uma função "saveTask" assente em dois argumentos.

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
      // se isEditing é verdadeiro
      return (
        // mostra os botões guardar e cancelar.
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
    const { task, isCompleted } = this.props.todo; // passa props da App para variáveis.

    const taskStyle = {
      color: isCompleted ? "green" : "red", // se 'true' fica verde, se 'false' fica vermelho.
      cursor: "pointer" // permite tocar nas tarefas com o rato.
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
          style={taskStyle} // todas as tarefas ficam com estas atribuições.
          onClick={() => this.props.toggleTask(this.props.todo)} // usa uma função da App para mudar o valor de isComplete; task já está definida em cima.
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
