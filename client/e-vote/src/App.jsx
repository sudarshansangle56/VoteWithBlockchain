import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashborad'
import Home from './pages/Home'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-red-100 min-h-screen">
        {/* Navbar will always show */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
