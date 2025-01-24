import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Notes from './Notes'
import AddButton from '../components/AddButton'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <div className=''>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Notes searchTerm={searchTerm} />
      <AddButton/>
    </div>
  )
}

export default Home
