import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, createTodo, updateTodo, deleteTodo, completeTodo } from '../../api';

const initialState = {
  todos: [],
  status: 'idle',
  error: null
};

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  const todos = await fetchTodos();
  return todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const newTodo = await createTodo(todo);
  return newTodo;
});

export const editTodo = createAsyncThunk('todos/editTodo', async (todo) => {
  const updatedTodo = await updateTodo(todo);
  return updatedTodo;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
  await deleteTodo(id);
  return id;
});

export const toggleTodo = createAsyncThunk('todos/toggle', async (id) => {
  await completeTodo(id);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  }
});

export default todosSlice.reducer;