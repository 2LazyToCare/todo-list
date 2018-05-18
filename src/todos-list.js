import React from "react";
import PropTypes from 'prop-types';
import TodosListHeader from "./todos-list-header";
import TodosListItem from "./todos-list-item";
import TodosListClear from "./todos-list-clear"
import "./CSS/TodoList.css";

export default class TodosList extends React.Component {
  renderItems = (todo) => {
    return <TodosListItem key={todo.key} todo={todo} {...this.props} />;
  };

  render() {
    const todoEntries = this.props.todos;
    const todoFilters = this.props.filter;
    const filteredItems = todoEntries.filter(
      todo =>
        todoFilters === "completed"
          ? todo.isCompleted
          : todoFilters === "active"
            ? !todo.isCompleted
            : todo
    );
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
