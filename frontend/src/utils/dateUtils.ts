export const formatEventDate = (dateString: string) => {
  try {
      // Убедитесь, что dateString приходит в ISO формате
      const date = new Date(dateString);
      
      // Проверка на валидность даты
      if (isNaN(date.getTime())) {
          console.error("Некорректная дата:", dateString);
          return "Дата не указана";
      }
      
      return date.toLocaleString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
  } catch (error) {
      console.error("Ошибка форматирования даты:", error);
      return "Неверный формат даты";
  }
};
export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  // Корректировка часового пояса
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() - timezoneOffset);
  
  return adjustedDate.toISOString().slice(0, 16);
};