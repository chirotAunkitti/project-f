import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Addusers from './components/Home/Admin/Addusers.jsx';
import Admin from './components/Home/Admin/Admin.jsx';
import Editusers from './components/Home/Admin/Editusers.jsx';
import Home from './components/Home/Home.jsx';
import Order from './components/Home/Order.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/editusers/:id" element={<Editusers />} />
          <Route path="/addusers" element={<Addusers />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;