import React, { useEffect, useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
const Completed = () => {
    const {setCompleted} = useTodoContext();
    const [completedTask,setCompletedTask] = useState([]);
  
    useEffect(() => {
        const savedCompletedTodo = localStorage.getItem("CompletedTodo");
        
        // Check if savedCompletedTodo is null or empty, and initialize accordingly
        if (savedCompletedTodo) {
            setCompletedTask(JSON.parse(savedCompletedTodo));
        } else {
            setCompletedTask([]); // Set an empty array if nothing is found in localStorage
        }
    }, [completedTask,setCompletedTask]);
  
const handleDeleteAll=()=>{
    localStorage.removeItem("CompletedTodo")
    // setCompletedTask([]);
    setCompleted([])
}


  return (
  <>
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Completed Task</h2>

   

      <ul className="space-y-4">
        {completedTask&&completedTask.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-green-400 rounded-lg shadow-md hover:bg-green-500 transition"
          
          >
            <span className="text-white font-semibold flex-grow cursor-pointer">
              {todo.task}
            </span>

            
          </li>
        ))}
      </ul>

      <div className={`flex ${completedTask.length>0?`justify-between`:`justify-center`} items-center mt-6`}>
        <p className="text-purple-800 font-semibold">{completedTask.length>1?`you have completed ${completedTask.length} tasks`:`you have completed ${completedTask.length} task`}</p>
        {completedTask.length>0&&<button
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-red-600 transition"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>}
      </div>
    </div>
  </div>
  </>
  )
}

export default Completed
