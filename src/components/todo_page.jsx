import { useEffect } from 'react';
import { Form } from './form';
import { Todos } from './todos';

export const TodoPage = ({ inputText, setInputText, todos, setTodos, getTodos, 
    handleSubmit, setTodoTime, setTodoDate, handleDelete, toggleStatus }) => {

    useEffect(() => {
        getTodos()
    }, []);

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