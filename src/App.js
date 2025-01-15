import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import DeletedTodos from './pages/DeletedTodos';
import Completed from './pages/Completed';
function App() {
  return (
  <div>
    <Toaster/>
     <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/deleted' element={<DeletedTodos/>}/>
    <Route path='/completed' element={<Completed/>}/>
   </Routes>
  </div>
  );
}

export default App;
