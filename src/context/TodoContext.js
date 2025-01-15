import React,{createContext,useContext,useState,useEffect} from 'react'
import toast from 'react-hot-toast';
const TodoContext=createContext();

const TodoOperationsProvider=({children})=>{
    const[todos,setTodos]=useState([]);
    const[deletedTodos,setDeletedTodos]=useState([]);
    const[modalVisible,setModalVisible]=useState(false);
    const[editingTodo,setEditingTodo]=useState(null);
    const[completed,setCompleted]=useState([])
    const [flag, setFlag] = useState(localStorage.getItem('flag') === 'true')
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos && savedTodos.length > 0) {
          setTodos(savedTodos); 
        } else if(!flag) {
          setTodos([
            { id: 1, task: 'example task 1', completed: false,initial:true },
            { id: 2, task: 'example task 2', completed: true,initial:true }
          ]);
          localStorage.setItem("todos", JSON.stringify([
            { id: 1, task: 'example task 1', completed: false,initial:true  },
            { id: 2, task: 'example task 2', completed: true,initial:true  }
          ])); 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    
      useEffect(() => {
        localStorage.setItem('flag', flag.toString()); 
      }, [flag]);
    
     
      useEffect(() => {
        if (todos.length > 0) {
          localStorage.setItem("todos", JSON.stringify(todos)); 
        }
      }, [todos]);
    
      
      const addToTodo = (task) => {
        const trimmedTask = task.trim();
        
        if (!trimmedTask) {
          toast.error('Enter valid task');
          return;
        }
   
        if (!flag) {
          localStorage.removeItem("todos");  
          setTodos([]); 
    
          setTodos([{ id: Date.now(), task: trimmedTask, completed: false,initial:false }]);  
          setFlag(true);
          toast.success('new task added successfully') 
        } else {
          setTodos([...todos, { id: Date.now(), task: trimmedTask, completed: false,initial:false }]); 
          toast.success('new task added successfully') 
        }
      };

    // function for deleting the todo task
    const deletedTodo = (id) => {
        const deletedTodoTask = todos.find((todo) => todo.id === id);
        const updatedTodos = todos.filter((todo) => todo.id !== id);
    
        if (deletedTodoTask && !deletedTodoTask.initial) {
           
            setDeletedTodos((prevDeletedTodos) => {
                const updatedDeletedTodos = [...prevDeletedTodos, deletedTodoTask];
                localStorage.setItem("deletedTodo", JSON.stringify(updatedDeletedTodos)); 
                return updatedDeletedTodos; 
            });
        }
    
       
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        toast.success('task deleted successfully');
    }

    // function for restoring the deleted todos
    const restoreTodo=(id)=>{
        const restoredTodoTask = deletedTodos.find((todo) => todo.id === id);
        if (restoredTodoTask) {
          
            const updatedTodos = [...todos, restoredTodoTask];
            setTodos(updatedTodos); 
    
           
            const updatedDeletedTodos = deletedTodos.filter((todo) => todo.id !== id);
            setDeletedTodos(updatedDeletedTodos);
    
           
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            localStorage.setItem("deletedTodo", JSON.stringify(updatedDeletedTodos));
    
            toast.success('Task restored successfully');
    }

    }
    // function for updating the todo task
    const updateTodoTask=(id,newTask)=>{
        setTodos((prevTodos)=>
        prevTodos.map((todo)=>
            todo.id===id?{...todo,task:newTask}:todo
        )
        )
        localStorage.setItem('todos',JSON.stringify(todos))
        toast.success('task updated successfully')
    }


    // function for deleting all the task
    const deleteAllTodo = () => {
        const nonInitialTodos = todos.filter((todo) => !todo.initial);
      
        if (nonInitialTodos.length > 0) {

          setDeletedTodos((prevDeletedTodos) => {
            const updatedDeletedTodos = [...prevDeletedTodos, ...nonInitialTodos];
            localStorage.setItem("deletedTodo", JSON.stringify(updatedDeletedTodos)); 
            return updatedDeletedTodos;
          });
      
          
          const updatedTodos = todos.filter((todo) => todo.initial);
          setTodos(updatedTodos);
          localStorage.setItem('todos', JSON.stringify(updatedTodos)); 
        }
      
        // Remove 'todos' from localStorage and show success toast
        localStorage.removeItem('todo');
        toast.success('All tasks have been deleted');
      };

    // function for completing the task
    const completeTodo=(id)=>{
    const completedItem=todos.find((todo)=>todo.id===id);
    const updatedTodos=todos.filter((todo)=>todo.id!==id);
    
    setCompleted((prevCompleted)=>{
        const updatedCompleted=[...prevCompleted,completedItem];
        localStorage.setItem('CompletedTodo',JSON.stringify(updatedCompleted));
        return updatedCompleted
    })
    setTodos(updatedTodos);
    localStorage.setItem('todos',JSON.stringify(updatedTodos));
    toast.success('completed task removed')
    }
    // function for open edit modal
    const openEditModal=(todo)=>{
        setEditingTodo(todo);
        setModalVisible(true);
    }
    // fucntion for closing the edit modal
    const closeEditModal=()=>{
        setEditingTodo(null);
        setModalVisible(false);
    }
    return (
        <TodoContext.Provider value={{todos,setTodos,deletedTodos,setDeletedTodos,addToTodo,deletedTodo,restoreTodo,modalVisible,updateTodoTask,setModalVisible,editingTodo,setEditingTodo,openEditModal,closeEditModal,deleteAllTodo,completeTodo,completed,setCompleted}}>
        {children}
        </TodoContext.Provider>
    )
}


const useTodoContext=()=>useContext(TodoContext);
export {useTodoContext,TodoOperationsProvider};