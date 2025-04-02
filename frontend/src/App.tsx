import React from 'react';
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/Home/HomePage';
import EventsPage from './components/Events/EventsPage';
import BookingPage from './components/Booking/BookingPage';
import NotFoundPage from './components/NotFound/NotFoundPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import EventPage from './components/Events/EventDetailPage';
import EditEventPage from './components/Events/EventEdit';
import EventCreate from './components/Events/EventCreate';
import { isAuthenticated } from './utils/authHelper';
import './App.css';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return !isAuthenticated() ? element : <Navigate to="/events" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<UserProfilePage />} />}
        />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} />}
        />
        <Route 
          path="/register" 
          element={<PublicRoute element={<RegisterPage />} />} 
        />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/booking" element={<PrivateRoute element={<BookingPage />} />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route 
          path="/events/edit/:id" 
          element={<PrivateRoute element={<EditEventPage />} />} 
        />
        <Route 
          path="/events/create" 
          element={<PrivateRoute element={<EventCreate />} />} 
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;