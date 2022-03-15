import { useState, useEffect } from "react";
import { Todos } from "./todos";
import { getTodoLoading, getTodoSuccess, getTodoError, deleteTodoLoading, deleteTodoSuccess, deleteTodoError, 
    updateTodoLoading, updateTodoSuccess, updateTodoError } from '../features/action';
import { useDispatch } from 'react-redux';

export const Completed = ({ todos, setTodos }) => {

    const [filterTodo, setFilterTodo] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getCompleted();
    }, [todos]);

    const getTodos = async () => {
        try{
            dispatch(getTodoLoading());
            const data = await fetch("http://localhost:3001/todos")
            .then((d) => d.json());
            dispatch(getTodoSuccess(data));
        }
        catch(err){
            dispatch(getTodoError(err));
            console.log(err);
        }
    }

    const handleDelete = (id) => {
        dispatch(deleteTodoLoading());
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE"
        })
        .then((d) => d.json())
        .then((res) => {
            dispatch(deleteTodoSuccess(res));
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
            })
        })
        .then((d) => d.json())
        .then((res) => {
            console.log(res);
            dispatch(updateTodoSuccess(res));
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

    const getCompleted = () => {
        let filter = todos.filter((el) => el.status === true);
        setFilterTodo(filter);
    }

    const handleDeleteAll = () => {
        todos.forEach((el) => {
            if(el.status === true) {
                handleDelete(el.id);
            }
        })
    }

    return(
        <div className="pendingContainer">
            {filterTodo.length === 0 ? <h3>You have no completed task</h3> :
                <div>
                    <button className="deleteAllBtn" onClick={handleDeleteAll}>Delete all</button>
                    <Todos todos={filterTodo} setTodos={setFilterTodo} handleCompleted={handleCompleted} handleDelete={handleDelete} />
                </div>  
            }
        </div>
    )
};