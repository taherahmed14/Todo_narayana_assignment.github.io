import "../App.css";

export const Todo = ({ todo, text, handleCompleted, handleDelete }) => {

    return(
        <>
            <div className='todo'>
                <div className={todo.status ? "completed" : "notCompleted"}>
                    <div>{text}</div>
                    <div className="dateandtime">To be completed:</div>
                    <div className="dateandtime">Time - {todo.todoTime}</div>
                    <div className="dateandtime">Date - {todo.todoDate}</div>
                </div>
                <div>
                    <button onClick={() => {handleCompleted(todo.id)}}>
                        <img src="https://img.icons8.com/dotty/80/000000/task-completed.png" alt="completed" />
                    </button>
                    <button onClick={() => {handleDelete(todo.id)}}>
                        <img src="https://img.icons8.com/wired/64/000000/filled-trash.png" alt="delete" />
                    </button>
                </div>
            </div>
        </>
    )
}