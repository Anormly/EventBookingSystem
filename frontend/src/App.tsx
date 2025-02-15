import React from 'react';
import { BrowserRouter as Router, Route, /* Switch, */ Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthPage from './components/Auth/AuthPage';
import HomePage from './components/Home/HomePage';
import EventsList from './components/Events/EventsList';
import EventsPage from './components/Events/EventsPage';
import BookingPage from './components/Booking/BookingPage';
import NotFoundPage from './components/NotFound/NotFoundPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Обработка 404 */}
      </Routes>
      <Footer />
    </Router>
  );
};

/*
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={EventsList} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/profile" component={UserProfilePage} />
      </Switch>
      <Footer />
    </Router>
  );
};
*/

export default App;
