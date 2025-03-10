import React from 'react';
import ReactDOM from 'react-dom/client'; // Обратите внимание на изменение импорта
import App from './App';
import './styles/global.css';

// Создаем корень приложения
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Рендерим приложение
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
