const API_URL = 'http://localhost:4000/api/';

export const fetchTodos = async () => {
  const response = await fetch(API_URL+'todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch(API_URL+'todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

export const updateTodo = async (todo) => {
  const response = await fetch(`${API_URL}todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};

export const completeTodo = async (id) => {
  const response = await fetch(`${API_URL}todos/toggle/${id}`, {
    method: 'PUT',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response.json();

};