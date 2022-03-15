import { useState, useEffect } from "react";
import { Todos } from "./todos";

export const Completed = ({ todos, handleDelete, toggleStatus }) => {

    const [filterTodo, setFilterTodo] = useState([]);

    useEffect(() => {
        getCompleted();
    }, [todos]);

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