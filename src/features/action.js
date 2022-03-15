import { ADD_TODO, ADD_TODO_LOADING, ADD_TODO_SUCCESS, 
    ADD_TODO_ERROR, GET_TODO_SUCCESS, GET_TODO_LOADING, GET_TODO_ERROR,
    DELETE_TODO_LOADING,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_ERROR,
    UPDATE_TODO_LOADING,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_ERROR } from "./actionTypes";

export const addTodo = (data) => ({
    type: ADD_TODO,
    payload: data,
});

export const addTodoLoading = () => {
    return {
        type: ADD_TODO_LOADING,
    }
};

export const addTodoSuccess = (data) => {
    return {
        type: ADD_TODO_SUCCESS,
        payload: data,
    }
};

export const addTodoError = (err) => {
    return {
        type: ADD_TODO_ERROR,
        payload: err,
    }
};

export const getTodoLoading = () => {
    return {
        type: GET_TODO_LOADING
    }
}

export const getTodoSuccess = (data) => {
    return {
        type: GET_TODO_SUCCESS,
        payload: data
    }
}

export const getTodoError = (err) => {
    return {
        type: GET_TODO_ERROR,
        payload: err
    }
}

export const deleteTodoLoading = () => {
    return {
        type: DELETE_TODO_LOADING,
    }
};

export const deleteTodoSuccess = (data) => {
    return {
        type: DELETE_TODO_SUCCESS,
        payload: data,
    }
};

export const deleteTodoError = (err) => {
    return {
        type: DELETE_TODO_ERROR,
        payload: err,
    }
};

export const updateTodoLoading = () => {
    return {
        type: UPDATE_TODO_LOADING,
    }
};

export const updateTodoSuccess = (data) => {
    return {
        type: UPDATE_TODO_SUCCESS,
        payload: data,
    }
};

export const updateTodoError = (err) => {
    return {
        type: UPDATE_TODO_ERROR,
        payload: err,
    }
};
