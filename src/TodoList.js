import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [{ task: "hello wors" }, { task: "Chickenwing" }] };
    this.create = this.create.bind(this);
  }

  create(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  render() {
    const todoList = this.state.todos.map(todo => <Todo task={todo.task} />);
    return (
      <div>
        <h1>Todo List!</h1>
        <ul>{todoList}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}
