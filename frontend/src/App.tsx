import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthPage from './components/Auth/AuthPage';
import HomePage from './components/Home/HomePage';
import EventsList from './components/Events/EventsList';
import EventsPage from './components/Events/EventsPage';
import BookingPage from './components/Booking/BookingPage';
import NotFoundPage from './components/NotFound/NotFoundPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import useAuth from './hooks/useAuth';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import './App.css';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <UserProfilePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/profile" replace /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Обработка 404 */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
