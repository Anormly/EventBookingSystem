import React from 'react';
import './Loader.module.css'; // Импортируем стили для индикатора загрузки

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default Loader;
