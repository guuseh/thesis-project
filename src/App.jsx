import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// import Home from "./Home.jsx"
import Home from "./HomeNew.jsx"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
