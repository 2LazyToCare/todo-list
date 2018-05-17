import React from "react";
import { Link } from "react-router-dom";
import "./TodoList.css";
import CreateTodo from "./create-todo";
import TodosList from "./todos-list";
import { getFetch } from "./fetch";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: "all"
    };
    this.apiUrl = "http://5af2d4d6cca5e20014bba456.mockapi.io/todos";
  };

  componentDidMount = () => {
    getFetch(this.apiUrl).then(response => {
      this.setState({ todos: response });
    });
  };

  index() {
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if (this.state.todos.length > 0) {
      return lastTodo.key + 1;
    } else {
      return 1;
    }
  };

  createTask = task => {
    const body = JSON.stringify({
      task,
      key: this.index(),
      isCompleted: false
    });
    getFetch(this.apiUrl, "POST", body).then(response => {
      this.state.todos.push(response);
      this.setState({ todos: this.state.todos });
    });
  };

  toggleTask = todo => {
    const toggleItems = this.state.todos.map(
      t => (t.key === todo.key ? { ...t, isCompleted: !t.isCompleted } : t)
    );
    const body = JSON.stringify({
      isCompleted: !todo.isCompleted
    });
    const url = this.apiUrl + "/" + todo.key;
    getFetch(url, "PUT", body).then(() => {
      this.setState({
        todos: toggleItems
      });
    });
  };

  saveTask = (todo, value) => {
    const savedItems = this.state.todos.map(
      t =>
        t.key === todo.key &&
        value.length > 0 &&
        !this.state.todos.find(tt => tt.task === value)
          ? { ...t, task: value, isCompleted: false }
          : t
    );
    const validateTask =
      value.length > 0 && !this.state.todos.find(tt => tt.task === value);
    const validateStatus = this.state.todos.task !== value;
    const url = this.apiUrl + "/" + todo.key;
    const body = JSON.stringify({
      task: value,
      isCompleted: false
    });
    if (validateStatus && validateTask) {
      getFetch(url, "PUT", body).then(() => {
        this.setState({
          todos: savedItems
        });
      });
    }
  };

  deleteTask = key => {
    const filteredItems = this.state.todos.filter(todo => todo.key !== key);
    const url = this.apiUrl + "/" + key;
    getFetch(url, "DELETE").then(() => {
      this.setState({
        todos: filteredItems
      });
    });
  };

  clearComplete = () => {
    const remainingTasks = this.state.todos.filter(todo => !todo.isCompleted);
    const completedTodos = this.state.todos.filter(todo => todo.isCompleted);
    Promise.all(
      completedTodos.map(todo =>
        getFetch(this.apiUrl + "/" + todo.key, "DELETE")
      )
    ).then(() => {
      this.setState({
        todos: remainingTasks
      });
    });
  };

  filterTodos = filter => {
    this.setState({
      filter: filter
    });
  };

  render() {
    return (
      <div className="header">
        <Link to="/" className="voltar">Voltar</Link>
        <h1 className="title">Lista de Tarefas</h1>
        <CreateTodo todos={this.state.todos} createTask={this.createTask} />
        <TodosList
          todos={this.state.todos}
          toggleTask={this.toggleTask}
          saveTask={this.saveTask}
          deleteTask={this.deleteTask}
          filter={this.state.filter}
          filterTodos={this.filterTodos}
          clearComplete={this.clearComplete}
        />
      </div>
    );
  }
}
