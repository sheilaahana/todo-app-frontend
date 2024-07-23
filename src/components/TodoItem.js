import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo, editTodo } from '../modules/todos/todosSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.todo);

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');
    if (confirmed) {
      dispatch(removeTodo(todo.id));
    }
  };

  const handleComplete = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editTodo({
      ...todo,
      todo: newTodo,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTodo(todo.todo);
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <div className="row p-3">
      <div className="input-group">
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            checked={todo.is_complete === 1}
            onChange={handleComplete}
          />
        </div>
        {isEditing ? (
          <input
            type="text"
            className="form-control ms-2"
            value={newTodo}
            onChange={handleChange}
          />
        ) : (
          <input
            type="text"
            className={`form-control ms-2 ${todo.is_complete === 1 ? 'strikethrough' : ''}`}
            disabled
            value={todo.todo}
          />
        )}
        {isEditing ? (
          <>
            <button onClick={handleSave} className='btn btn-sm btn-primary'><i className="bi bi-check"></i></button>
            <button onClick={handleCancel} className='btn btn-sm btn-secondary'><i className="bi bi-x"></i></button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className='btn btn-sm btn-secondary'><i className="bi bi-pencil-square"></i></button>
            <button onClick={handleDelete} className='btn btn-sm btn-danger'><i className="bi bi-trash"></i></button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;