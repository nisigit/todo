import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

export default (props) => {
    return (
        <>
            <div style={{ backgroundColor: props.todo.complete ? '#b7e4c7' : '#ffccd5' }} className="todo-panel">
                <div
                    onClick={props.toggleComplete}
                    style={{
                        textDecoration: props.todo.complete
                            ? 'line-through'
                            : ''
                    }}
                >
                    {props.todo.text}
                </div>
                <div>
                    <div onClick={props.toggleComplete}>
                        {props.todo.complete
                            ? (<CancelIcon
                                style={{ fill: '#212529' }}
                            />)
                            : (<CheckCircleIcon
                                style={{ fill: '#06d6a0' }}
                            />)}
                    </div>
                    <div>
                        <DeleteIcon
                            style={{ fill: '#f94144' }}
                            onClick={props.onDelete}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}