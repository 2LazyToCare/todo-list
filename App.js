import React from "react";
import { Link } from "react-router-dom";
import "./TodoList.css";
import CreateTodo from "./create-todo";
import TodosList from "./todos-list";

// const todos = [
//   {
//     task: "Aprender React",
//     key: 1,
//     isCompleted: false
//   },
//   {
//     task: "Tomar comprimidos",
//     key: 2,
//     isCompleted: true
//   }
// ];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [], // Array vazio.
      filter: "all"
    };

    this.apiUrl = "http://5af2d4d6cca5e20014bba456.mockapi.io/todos";
  }

  componentDidMount = () => {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(response => {
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
  }

  createTask = task => {
    fetch(this.apiUrl, {
      method: "POST",
      mode: "CORS",
      body: JSON.stringify({
        task,
        key: this.index(),
        isCompleted: false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        this.state.todos.push(response);
        this.setState({ todos: this.state.todos });
      });

    // this.state.todos.push({
    //   // push acrescenta, desde caso propriedades, no fim de cada array.
    //   task, // Tarefa vazia.
    //   key: this.index(), // Key é definida pelo index.
    //   isCompleted: false // isComplete utiliza um boolean.
    // });
    // this.setState({ todos: this.state.todos }); // Todas as propriedades passaram para o estado/array em cima.
  };

  toggleTask = todo => {
    const toggleItems = this.state.todos.map(
      t => (t.key === todo.key ? { ...t, isCompleted: !t.isCompleted } : t)
    );

    fetch(this.apiUrl + "/" + todo.key, {
      method: "PUT",
      body: JSON.stringify({
        isCompleted: !todo.isCompleted
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      this.setState({
        todos: toggleItems
      });
    });

    // this.setState(state => ({
    //   todos: state.todos.map(
    //     // .map() constrói um novo array com as mudanças implementadas em cada elemento.
    //     t => (t.key === todo.key ? { ...t, isCompleted: !t.isCompleted } : t) // se dois items têm a mesma key então isCompleted troca para o oposto do valor que apresentava (true para false, false para true), senão nada.
    //   )
    // }));
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

    if (validateStatus && validateTask) {
      fetch(this.apiUrl + "/" + todo.key, {
        method: "PUT",
        body: JSON.stringify({
          task: value,
          isCompleted: false
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.setState({
          todos: savedItems
        });
      });
    }

    // this.setState(state => ({
    //   todos: state.todos.map(
    //     t =>
    //       t.key === todo.key &&
    //       value.length > 0 &&
    //       !this.state.todos.find(tt => tt.task === value)
    //         ? { ...t, task: value }
    //         : t // se dois items apresentam a mesma key e o novo valor não está vazio ou é repetido, então a propriedade task muda para o novo conteúdo em value.
    //   )
    // }));
  };

  deleteTask = key => {
    const filteredItems = this.state.todos.filter(todo => todo.key !== key); // .filter() passa apenas os elementos que passam a função. Passamos a key do item selecionado e verificamos essa key com todos os outros que estão armazenados aqui.

    fetch(this.apiUrl + "/" + key, {
      method: "DELETE"
    }).then(() => {
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
        fetch(this.apiUrl + "/" + todo.key, {
          method: "DELETE"
        })
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
