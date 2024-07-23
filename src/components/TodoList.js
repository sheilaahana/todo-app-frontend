import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, removeTodo, editTodo } from '../modules/todos/todosSlice';
import TodoItem from '../components/TodoItem';



const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector(state => state.todos);

  // State to manage the selected filter
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTodos());
    }
  }, [dispatch, status]);

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return todo.is_complete === 0;
    }
    if (filter === 'completed') {
      return todo.is_complete === 1;
    }
    return true; // 'all' filter
  });

  // Handler for filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mt-3 p-4 row justify-content-center">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <a 
              className={`nav-link ${filter === 'all' ? 'active' : ''}`} 
              href="#"
              onClick={() => handleFilterChange('all')}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${filter === 'active' ? 'active' : ''}`} 
              href="#"
              onClick={() => handleFilterChange('active')}
            >
              Active
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${filter === 'completed' ? 'active' : ''}`} 
              href="#"
              onClick={() => handleFilterChange('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
      </div>
      <div className="list-todo">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
