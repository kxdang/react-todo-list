import React, { Component } from "react";
import uuid from "uuid/v4";
import "./NewTodoForm.css";

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const newTodo = { ...this.state, id: uuid(), completed: false };
    this.props.createTodo(newTodo); //always pass the data through this type of pattern
    this.setState({ task: "" });
  }

  render() {
    return (
      <div>
        <form className="NewTodoForm" onSubmit={this.handleSubmit}>
          <label htmlFor="task">Add todo:</label>
          <input
            id="task"
            type="text"
            placeholder="E.g Laundry..."
            name="task"
            value={this.state.task}
            onChange={this.handleChange}
          />
          <button>Add</button>
        </form>
      </div>
    );
  }
}
