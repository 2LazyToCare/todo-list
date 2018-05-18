import React from "react";
import PropTypes from 'prop-types';
import "./CSS/TodoList.css";

export default class TodosListClear extends React.Component {
  hideClear() {
    const { todos, filter } = this.props;
    if (todos.find(todo => todo.isCompleted) && filter !== "active") {
      return (
        <tr className="subLast">
          <th className="clearAll">
            <a onClick={() => this.props.clearComplete()}>Apagar Completas</a>
          </th>
        </tr>
      );
    }
  }

  render() {
    return <tfoot className="footer">{this.hideClear()}</tfoot>;
  }
}

TodosListClear.propTypes = {
  todos: PropTypes.array,
  filter: PropTypes.string,
  clearComplete: PropTypes.func
}
