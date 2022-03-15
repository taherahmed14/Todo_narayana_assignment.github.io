import { Todo } from "./todo"

export const Todos = ({ todos, setTodos, handleCompleted, handleDelete }) => {
    return(
        <>
            <div>
                <ul>
                    {todos.map((el => (
                        <Todo todos={todos} setTodos={setTodos} key={el.id} todo={el} text={el.text}
                        handleCompleted={handleCompleted} handleDelete={handleDelete} />
                    )))}
                </ul>
            </div>
        </>
    )
}