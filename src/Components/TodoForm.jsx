import React, { Component } from 'react';
import shortid from 'shortid';
import './Components.css';

const initialState = {
    text: "",
    textError: "",
};

export default class TodoForm extends Component {

    state = initialState;

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    validateForm = (event) => {
        if (!this.state.text) {
            this.setState({ textError: "Cannot add empty task." });
            return false;
        }
        return true;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm(event);
        if (isValid) {
            this.props.onSubmit({
                id: shortid.generate(),
                text: this.state.text,
                complete: false,
            });
            this.setState(initialState);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="task-input"
                            name="text"
                            type="text"
                            placeholder="todo..."
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                        <button className="submit-btn" type="submit">Add Task</button>
                    </form>
                </div>
                <div style={{ fontSize: '16px', color: 'red' }}>
                    {this.state.textError}
                </div>
            </div>
        );
    };
}