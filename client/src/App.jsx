import './App.css'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import { useState } from 'react'

function App() {

  // Updating current User
  const [currentUser, setCurrentUser] = useState({})
  const userUpdater = (user) => {
    setCurrentUser(user)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard currentUser={currentUser} />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
