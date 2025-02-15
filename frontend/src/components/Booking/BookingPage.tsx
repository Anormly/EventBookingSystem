import React from 'react';
import styles from './BookingPage.module.css';

const BookingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Бронирование</h1>
      <p>Здесь вы можете забронировать билеты на выбранное мероприятие.</p>
       {/* Здесь будет форма бронирования */}
    </div>
  );
};

export default BookingPage;