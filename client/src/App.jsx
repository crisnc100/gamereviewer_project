import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import GamesPage from "./views/GamesPage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {

const [currentUser, setCurrentUser] = useState({})
const userUpdater = (newUser) => {
  setCurrentUser(newUser)
}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home userUpdater={userUpdater} />} />
          <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
          <Route path="/dashboard/search-games" element={<GamesPage currentUser={currentUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
