import { useState, useEffect } from "react";
import { Todos } from "./todos";

export const Pending = ({ todos, handleDelete, toggleStatus }) => {

    const [filterTodo, setFilterTodo] = useState([]);

    useEffect(() => {
        getPending();
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

    const getPending = () => {
        let filter = todos.filter((el) => el.status === false);
        setFilterTodo(filter);
    }

    return(
        <div className="pendingContainer">
            {filterTodo.length === 0 ? <h3>You have no pending task</h3> :
                <div>
                    <Todos todos={filterTodo} setTodos={setFilterTodo} handleCompleted={handleCompleted} handleDelete={handleDelete} />
                </div>  
            }
        </div>
    )
};