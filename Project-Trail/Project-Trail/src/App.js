import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactInfo';
import SignupPage from './Component'; 
import LoginPage from './Component'; 
import Navigation from './Links/Navigation';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import './App.css';
import Dashboard from './components/Dashboard';
import Cars from './components/Car';
import Bikes from './components/Bike';
import Logout from './components/Logout';
import Settings from './components/Settings';
import CarPage from './components/CarPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path ="/dashboard" element={<Dashboard/>}/>
          <Route path ="/cars" element={<Cars/>}/>
          <Route path ="/bikes" element={<Bikes/>}/>
          <Route path ="/logout" element={<Logout/>}/>
          <Route path ="/settings" element={<Settings/>}/>
          <Route path ="/car-search" element={<CarPage/>}/>

        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
