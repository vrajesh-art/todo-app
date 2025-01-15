import React, { useState } from 'react';
import { FaCheckCircle, FaTrash, FaPlus } from 'react-icons/fa';
import { useTodoContext } from '../context/TodoContext';

const Todolist = () => {
  const { addToTodo, todos, openEditModal, deletedTodo, deleteAllTodo, completeTodo } = useTodoContext();
  const [newTodo, setNewTodo] = useState('');

  const addingToTodo = (task) => {
    addToTodo(task);
    setNewTodo('');
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deletedTodo(id);
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      deleteAllTodo();
    }
  };

  const handleComplete = (e, id) => {
    e.stopPropagation();
    completeTodo(id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 sm:text-3xl">Todo List</h2>

        <div className="flex mb-4 gap-2 border-b-4 p-3 border-purple-800 rounded-md">
          <input
            type="text"
            value={newTodo}
            placeholder="new task"
            className="w-full outline-none px-3 py-2 sm:text-lg"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            onClick={() => addingToTodo(newTodo)}
          >
            <FaPlus /> Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
              onClick={() => openEditModal(todo)}
            >
              <span className="text-gray-800 flex-grow cursor-pointer text-sm sm:text-base">
                {todo.task}
              </span>

              <div className="flex gap-2">
                <button
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={(e) => handleDelete(e, todo.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={(e) => handleComplete(e, todo.id)}
                >
                  <FaCheckCircle />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-6">
          <p className="text-purple-800 font-semibold text-sm sm:text-base">
            {todos.length > 1
              ? `You have ${todos.length} tasks pending`
              : `You have ${todos.length} task pending`}
          </p>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-red-600 transition"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
