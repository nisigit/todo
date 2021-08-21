import React, { Component } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './Components.css';

export default class TodoList extends Component {

    state = {
        todos: [],
        todosToShow: 'all',
        toggleAllComplete: false,
    };

    addTodo = todo => {
        this.setState({
            todos: [todo, ...this.state.todos]
        });
    }

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo
                }
            })
        });
    }

    updateTodoShow = (s) => {
        this.setState({ todosToShow: s });
    }

    handleDeleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    removeCompletedTodos = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        });
    }

    toggleAllComplete = () => {
        this.setState({
            todos: this.state.todos.map(todo => {
                return {
                    ...todo,
                    complete: !this.state.toggleAllComplete
                };
            }),
            toggleAllComplete: !this.state.toggleAllComplete
        });
    }

    render() {
        let todos = [];
        if (this.state.todosToShow === 'all') {
            todos = this.state.todos;
        } else if (this.state.todosToShow === 'active') {
            todos = this.state.todos.filter(todo => !todo.complete);
        } else if (this.state.todosToShow === 'complete') {
            todos = this.state.todos.filter(todo => todo.complete);
        }

        return (
            <div className="list-container">
                <div>
                    <TodoForm
                        onSubmit={this.addTodo}
                    />
                </div>
                <div>
                    Tasks remaining: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button className="btn btn-classify" onClick={() => this.updateTodoShow('all')}>Show all tasks</button>
                    <button className="btn btn-classify" onClick={() => this.updateTodoShow('active')}>Show pending tasks</button>
                    <button className="btn btn-classify" onClick={() => this.updateTodoShow('complete')}>Show completed tasks</button>
                </div>
                <div>
                    {this.state.todos.some(todo => todo.complete)
                        ?
                        <button className="btn"
                            onClick={this.removeCompletedTodos}>
                            Delete all completed tasks
                        </button>
                        : null}
                    <button className="btn" onClick={this.toggleAllComplete}>Toggle all complete/incomplete</button>
                </div>
                <div>
                    {todos.map(todo => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            todo={todo}
                            toggleComplete={() => this.toggleComplete(todo.id)}
                            onDelete={() => this.handleDeleteTodo(todo.id)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}