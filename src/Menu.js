import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import "./Menu.css";

class Menu extends Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div id="menu">
        <h1>Bem-vindo!</h1>
        <div>
          <button onClick={() => this.nextPath("/info")}>Informação</button>
        </div>
        <div>
          <button onClick={() => this.nextPath("/app")}>
            Lista de Tarefas
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);

Menu.propTypes = {
  history: PropTypes.object
}
