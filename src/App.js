import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Completed } from './components/completed_page';
import { Navbar } from './components/navbar';
import { Pending } from './components/pending_page';
import { TodoPage } from './components/todo_page';
import { useSelector, useDispatch } from 'react-redux';
import { getTodoLoading, getTodoSuccess, getTodoError, addTodoLoading, addTodoSuccess, addTodoError,
  deleteTodoLoading, deleteTodoSuccess, deleteTodoError, updateTodoLoading, updateTodoError } from './features/action';

function App() {
  const [inputText, setInputText] = useState("");
  const [todoTime, setTodoTime] = useState();
  const [todoDate, setTodoDate] = useState();

  const { loading, todos, errors } = useSelector((state) => ({
      loading: state.loading,
      todos: state.todos,
      errors: state.errors
  })); 

  const dispatch = useDispatch();

  const getTodos = async () => {
    try{
        dispatch(getTodoLoading());
        const data = await fetch("https://todo-server-nar.herokuapp.com/todos")
        .then((d) => d.json());
        dispatch(getTodoSuccess(data));
    }
    catch(err){
        dispatch(getTodoError(err));
        console.log(err);
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todoTime, todoDate);
    if(todoTime === undefined || todoDate === undefined)
      alert("Enter Date and Time");
    
    else {
      dispatch(addTodoLoading());
      fetch("https://todo-server-nar.herokuapp.com/todos", {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
              status: false,
              text: inputText,
              todoTime,
              todoDate
          })
      })
      .then((d) => d.json())
      .then((res) => {
          dispatch(addTodoSuccess(res));
          getTodos();
      })
      .catch((err) => {
          dispatch(addTodoError(err))
          console.log(err);
      });
    }
}

  const handleDelete = (id) => {
    dispatch(deleteTodoLoading());
    fetch(`https://todo-server-nar.herokuapp.com/todos/${id}`, {
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
    fetch(`https://todo-server-nar.herokuapp.com/todos/${id}`, {
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

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<TodoPage inputText={inputText} setInputText={setInputText} todoTime={todoTime} setTodoTime={setTodoTime}
          todoDate={todoDate} setTodoDate={setTodoDate} todos={todos} getTodos={getTodos} handleSubmit={handleSubmit}
          handleDelete={handleDelete} toggleStatus={toggleStatus} />}></Route>
        <Route path='/todos/completed' element={<Completed todos={todos} todoDate={todoDate} todoTime={todoTime} handleDelete={handleDelete} 
          toggleStatus={toggleStatus}/>}>
        </Route>
        <Route path='/todos/pending' element={<Pending todos={todos} todoDate={todoDate} todoTime={todoTime} handleDelete={handleDelete} 
          toggleStatus={toggleStatus}/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
