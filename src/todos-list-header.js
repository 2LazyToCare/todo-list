import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./TodoList.css";

export default class TodosListHeader extends React.Component {
  render() {
    return (
      <thead className="sub0">
        <tr className="sub1">
          <th className="sub2">
            <Link
              className="all"
              style={
                this.props.filter === "all"
                  ? { color: "black", pointerEvents: "none" }
                  : null
              }
              onClick={() => this.props.filterTodos("all")}
              to="/app/all"
            >
              Todas
            </Link>
            <Link
              className="active"
              style={
                this.props.filter === "active"
                  ? { color: "black", pointerEvents: "none" }
                  : null
              }
              onClick={() => this.props.filterTodos("active")}
              to="/app/active"
            >
              Incompletas
            </Link>
            <Link
              className="completed"
              style={
                this.props.filter === "completed"
                  ? { color: "black", pointerEvents: "none" }
                  : null
              }
              onClick={() => this.props.filterTodos("completed")}
              to="/app/completed"
            >
              Completas
            </Link>
          </th>
        </tr>
        <tr className="sub3">
          <th className="tasks">Tarefa</th>
          <th className="actions">Acção</th>
        </tr>
      </thead>
    );
  }
}

TodosListHeader.propTypes = {
  filter: PropTypes.string,
  filterTodos: PropTypes.func
}
