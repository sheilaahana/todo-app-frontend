import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../modules/todos/todosSlice';

const TodoForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    todo: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('Form Data Submitted:', formData);

  };

  const handleSubmit = (event) => {
    if(formData.todo != null){
      dispatch(addTodo(formData));
    }else{
      window.confirm('Cannot be null');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="row">
        <div className="col-10">
            <input
            type="text"
            id="name"
            name="todo"
            placeholder="What To Do"
            className="form-control"
            required
            // value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-2">
            <button type="submit" className="btn btn-info">Add</button>
        </div>
      </div>
  </form>
  );
};

export default TodoForm;