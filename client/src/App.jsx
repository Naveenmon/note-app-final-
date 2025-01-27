import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Notes from '../pages/Notes'
import SingleNote from '../pages/SingleNote'
import Write from '../pages/Write'
import PrivateRoute from '../components/PrivateRoute'
import Register from '../pages/Register'
import Update from '../pages/Update'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path='/notes' element={<Notes/>}/>
              <Route path='/notes/:id' element={<SingleNote/>}/>
              <Route path='/write' element={<Write/>}/>
              <Route path='/notes/edit/:id' element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
