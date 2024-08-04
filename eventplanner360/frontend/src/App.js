import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Events from './components/Events';
import About from './components/About';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import BookingForm from './components/BookingForm';
import { BookingProvider } from './contexts/BookingContext';

const App = () => {
  return (
    <AuthProvider>
      <EventProvider>
      <BookingProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HeroSection/>} />
            <Route path="/events" element={<Events/>} />
            <Route path='/about' element={<About/>}/>
            <Route path="/contact" element={<ContactForm/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/booking" element={<BookingForm/>} />
          </Routes>
          <Footer />
        </Router>
        </BookingProvider>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
