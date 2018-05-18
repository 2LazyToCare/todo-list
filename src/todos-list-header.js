import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./CSS/TodoList.css";

export default class TodosListHeader extends React.Component {
  render() {
    const style = filter =>
      this.props.filter === filter
        ? { color: "black", pointerEvents: "none" }
        : null;
    
    return (
      <thead className="sub0">
        <tr className="sub1">
          <th className="sub2">
            <Link
              className="all"
              style={style("all")}
              onClick={() => this.props.filterTodos("all")}
              to="/app/all"
            >
              Todas
            </Link>
            <Link
              className="active"
              style={style("active")}
              onClick={() => this.props.filterTodos("active")}
              to="/app/active"
            >
              Incompletas
            </Link>
            <Link
              className="completed"
              style={style("completed")}
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
