import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(window.localStorage.getItem("todos") || "[]")
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  create(newTodo) {
    this.setState(
      {
        todos: [...this.state.todos, newTodo]
      },
      () =>
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  remove(id) {
    this.setState(
      {
        todos: this.state.todos.filter(todo => todo.id !== id)
      },
      () =>
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  updateTodo(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos }, () =>
      window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos }, () =>
      window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  render() {
    const todoList = this.state.todos.map(todo => (
      <Todo
        key={todo.id}
        id={todo.id}
        task={todo.task}
        completed={todo.completed}
        removeTodo={this.remove}
        updateTodo={this.updateTodo}
        toggleTodo={this.toggleCompletion}
      />
    ));
    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A simple react app by Kien Dang</span>
        </h1>
        <ul>{todoList}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}
