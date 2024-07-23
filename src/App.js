// src/App.js
import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="container">
      	<div className="row justify-content-center">
        	<div className="col-md-6 mx-auto">
         		<div className="p-3 m-4 border bg-light text-center">
            		<div className="row justify-content-center">
            			<h2 className='mb-3'>What's the plan for today?</h2>
            			<TodoForm />
          			</div>
					<TodoList />
        		</div>
			</div>
		</div>
    </div>
  );
};

export default App;