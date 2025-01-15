import React from 'react'
import Todolist from '../components/Todolist'
import Modal from '../components/Modal'
import Header from '../components/Header'
const HomePage = () => {
  return (
    <div>
      <Header/>
     <Todolist/>
     <Modal />
    </div>
  )
}

export default HomePage
