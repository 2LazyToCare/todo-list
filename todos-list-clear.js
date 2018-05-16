import React from "react";
import "./TodoList.css";

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
