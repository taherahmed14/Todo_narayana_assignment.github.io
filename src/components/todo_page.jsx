import { useEffect, useState } from 'react';
import { Form } from './form';
import { Todos } from './todos';
import { deleteTodoLoading, deleteTodoSuccess, deleteTodoError, updateTodoLoading, updateTodoSuccess, updateTodoError } from '../features/action';
import { useDispatch } from 'react-redux';

export const TodoPage = ({ inputText, setInputText, todos, setTodos, getTodos, handleSubmit, todoTime, setTodoTime, todoDate, setTodoDate }) => {

    useEffect(() => {
        getTodos()
    }, []);

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTodoLoading());
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE"
        })
        .then((d) => d.json())
        .then((res) => {
            getTodos();
        })
        .catch((err) => {
            dispatch(deleteTodoError(err))
            console.log(err);
        });
    }

    const toggleStatus = (id, text, currentStatus) => {
        dispatch(updateTodoLoading());
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id,
                text,
                status: currentStatus,
                todoDate,
                todoTime
            })
        })
        .then((d) => d.json())
        .then((res) => {
            console.log(res);
            getTodos();
        })
        .catch((err) => {
            dispatch(updateTodoError(err));
        });
    }

    const handleCompleted = (id) => {
        let currentStatus;
        let currentText;
        todos.forEach((el) => {
            if(el.id === id) {
                currentText = el.text;
                currentStatus = el.status;
            }
        });
        toggleStatus(id, currentText, !currentStatus);
    }

    return (
        <div>
            <Form inputText={inputText} setInputText={setInputText} setTodos={setTodos} setTodoTime={setTodoTime}
                setTodoDate={setTodoDate} todos={todos} handleSubmit={handleSubmit} />
            <Todos todos={todos} setTodos={setTodos} handleCompleted={handleCompleted} handleDelete={handleDelete} />
        </div>
    );
};