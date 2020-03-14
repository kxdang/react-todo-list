import React, { Component } from "react";
import "./Todo.css";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task
    }; //controls whether it is being edited and taking the updated task to pass up to parent using handleUpdate

    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggleCompetion = this.handleToggleCompetion.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleRemove() {
    this.props.removeTodo(this.props.id);
  }

  handleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleUpdate(evt) {
    evt.preventDefault();
    //take new task data and pass up to parent
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleToggleCompetion(evt) {
    this.props.toggleTodo(this.props.id);
  }
  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="Todo">
          <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
            <input
              type="text"
              value={this.state.task}
              name="task"
              onChange={this.handleChange}
            />
            <button onClick={this.handleUpdate}>Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="Todo">
          <li
            className={
              this.props.completed ? "Todo-task completed" : "Todo-task"
            }
            onClick={this.handleToggleCompetion}
          >
            {this.props.task}
          </li>
          <div className="Todo-buttons">
            <button onClick={this.handleEdit}>
              <i class="fas fa-pen" />
            </button>
            <button onClick={this.handleRemove}>
              <i class="fas fa-trash" />
            </button>
          </div>
        </div>
      );
    }

    return result;
  }
}
