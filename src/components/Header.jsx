import React from 'react'
import {useNavigate} from 'react-router-dom'
const Header = () => {
    const navigate=useNavigate();
    const handleChange=(e)=>{
    const value=e.target.value;
    if(value==="deleted"){
        navigate('/deleted')
    }
    else if(value==="completed"){
        navigate('/completed')
    }
    }
  return (
    <div className='py-2 px-4 flex justify-start md:justify-end'>
      <select className='bg-white border border-gray-300 rounded-md p-2' defaultValue="" onChange={handleChange}>
      <option value="" disabled>
          History
        </option>
        <option value="deleted">Deleted Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  )
}

export default Header
