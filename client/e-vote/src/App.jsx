import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashborad'
import Home from './pages/Home'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="bg-red-100 min-h-screen">
      
        <Navbar />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/Register' element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
