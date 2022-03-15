import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Completed } from './components/completed_page';
import { Navbar } from './components/navbar';
import { Pending } from './components/pending_page';
import { TodoPage } from './components/todo_page';
import { useSelector, useDispatch } from 'react-redux';
import { getTodoLoading, getTodoSuccess, getTodoError, addTodoLoading, addTodoSuccess, addTodoError } from './features/action';

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
        const data = await fetch("http://localhost:3001/todos")
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

    dispatch(addTodoLoading());
    fetch("http://localhost:3001/todos", {
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

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<TodoPage inputText={inputText} setInputText={setInputText} todoTime={todoTime} setTodoTime={setTodoTime}
          todoDate={todoDate} setTodoDate={setTodoDate} todos={todos} getTodos={getTodos} handleSubmit={handleSubmit} />}></Route>
        <Route path='/todos/completed' element={<Completed todos={todos} />} ></Route>
        <Route path='/todos/pending' element={<Pending todos={todos} />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
