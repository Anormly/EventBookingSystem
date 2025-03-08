import React from 'react';
import styles from './UserProfilePage.module.css';

const UserProfilePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Личный кабинет</h1>
      
      {/*Заглушки */}
      <section className={styles.bookingHistory}>
        <h2>История бронирований</h2>
        <ul className={styles.bookingList}>
          <li className={styles.bookingItem}>
            <p><strong>Бронирование 1:</strong> 12 марта 2023 - 15 марта 2023</p>
            <p>Статус: Завершено</p>
          </li>
          <li className={styles.bookingItem}>
            <p><strong>Бронирование 2:</strong> 20 апреля 2023 - 25 апреля 2023</p>
            <p>Статус: В процессе</p>
          </li>
        </ul>
      </section>

      <section className={styles.profileSettings}>
        <h2>Настройки профиля</h2>
        <form className={styles.settingsForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Имя пользователя</label>
            <input type="text" id="username" defaultValue="Ваше имя" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Электронная почта</label>
            <input type="email" id="email" defaultValue="example@mail.com" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" placeholder="Введите новый пароль" />
          </div>
          <button type="submit" className={styles.button}>Сохранить изменения</button>
        </form>
      </section>
    </div>
  );
};

export default UserProfilePage;
