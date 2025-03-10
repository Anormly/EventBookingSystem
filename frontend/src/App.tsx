import React from 'react';
import { BrowserRouter as Router, Route, /* Switch, */ Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/Home/HomePage';
import EventsPage from './components/Events/EventsPage';
import BookingPage from './components/Booking/BookingPage';
import NotFoundPage from './components/NotFound/NotFoundPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import './App.css'; 


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={ <UserProfilePage />
          }
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Обработка 404 */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
