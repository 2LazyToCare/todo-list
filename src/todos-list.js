import React from "react";
import PropTypes from 'prop-types';
import TodosListHeader from "./todos-list-header";
import TodosListItem from "./todos-list-item";
import TodosListClear from "./todos-list-clear"
import "./TodoList.css";

export default class TodosList extends React.Component {
  renderItems = (todo) => {
    return <TodosListItem key={todo.key} todo={todo} {...this.props} />;
  };

  render() {
    const todoEntries = this.props.todos;
    const todoFilters = this.props.filter;

    const filteredItems = todoEntries.filter(todo => {
      if (todoFilters === "completed") {
        return todo.isCompleted;
      } else if (todoFilters === "active") {
        return !todo.isCompleted;
      } else {
        return todo;
      }
    });
    const listItems = filteredItems.map(this.renderItems);

    return (
      <table className="table">
        <TodosListHeader {...this.props} />
        <tbody className="theList">{listItems}</tbody>
        <TodosListClear {...this.props}/>
      </table>
    );
  }
}

TodosList.propTypes = {
  todos: PropTypes.array,
  filter: PropTypes.string
}
