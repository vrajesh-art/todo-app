import React,{useEffect, useState} from 'react'
import { useTodoContext } from '../context/TodoContext'

const Modal = () => {
    const{modalVisible,setModalVisible,editingTodo,setEditingTodo,updateTodoTask,closeEditModal}=useTodoContext()
    const[editedTask,setEditedTask]=useState(editingTodo?.task||'')

    useEffect(()=>{
        setEditedTask(editingTodo?.task||'')
    },[editingTodo])
    // saving the updated task
   const saveEditedTask=()=>{
    if(editedTask.trim()){
        updateTodoTask(editingTodo.id, editedTask);
        closeEditModal();
    }
   }
   if (!modalVisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Todo</h3>
        <input
          type="text"
          value={editedTask}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEditedTask(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={closeEditModal}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={saveEditedTask}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
