import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
<<<<<<< HEAD
=======
import AuthPage from './components/Auth/AuthPage';
>>>>>>> 77abfb6876baabb7e082a908a4c5472f0c784fc8
import HomePage from './components/Home/HomePage';
import EventsPage from './components/Events/EventsPage';
import BookingPage from './components/Booking/BookingPage';
import NotFoundPage from './components/NotFound/NotFoundPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import './App.css';

const App: React.FC = () => {
<<<<<<< HEAD
=======
  const { isAuthenticated } = useAuth();

>>>>>>> 77abfb6876baabb7e082a908a4c5472f0c784fc8
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
<<<<<<< HEAD
          element={ <UserProfilePage />
          }
=======
          element={isAuthenticated ? <UserProfilePage /> : <Navigate to="/login" replace />}
>>>>>>> 77abfb6876baabb7e082a908a4c5472f0c784fc8
        />
        <Route
          path="/login"
          element={<LoginPage />}
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
