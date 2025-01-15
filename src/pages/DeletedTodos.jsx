import React, { useEffect, useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

const DeletedTodos = () => {
  const { restoreTodo } = useTodoContext();
  const [deletedTask, setDeletedTask] = useState([]);
  const [localDeletedTasks, setLocalDeletedTasks] = useState([]);

  useEffect(() => {
    const savedDeletedTodo = localStorage.getItem("deletedTodo");
    if (savedDeletedTodo) {
      const parsedDeletedTodos = JSON.parse(savedDeletedTodo);
      setLocalDeletedTasks(parsedDeletedTodos);
      setDeletedTask(parsedDeletedTodos); // Update context immediately with the saved data
    }
  }, []);

  const handleRestore = (id) => {
    restoreTodo(id);
    // Remove the task from the localDeletedTasks state and context
    const updatedDeletedTasks = localDeletedTasks.filter(todo => todo.id !== id);
    setLocalDeletedTasks(updatedDeletedTasks);
    setDeletedTask(updatedDeletedTasks); // Update context state to trigger re-render

    // Update localStorage to reflect the change
    localStorage.setItem("deletedTodo", JSON.stringify(updatedDeletedTasks));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 sm:text-3xl">Deleted Task</h2>

        <ul className="space-y-4">
          {deletedTask.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <span className="text-gray-800 flex-grow cursor-pointer text-xl sm:text-base font">
                {todo.task}
              </span>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => handleRestore(todo.id)}
                >
                  Restore
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center mt-6">
          <p className="text-purple-800 font-semibold text-sm sm:text-base">
            {deletedTask.length > 1
              ? `You have ${deletedTask.length} deleted tasks`
              : `You have ${deletedTask.length} deleted task`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeletedTodos;
