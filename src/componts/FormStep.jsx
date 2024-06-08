// Импортируем React и хук состояния из библиотеки react
import { useState } from "react";
import "./formStep.css";

// Определяем компонент App
function FormStep() {
  // Используем хук состояния для хранения данных о тренировках
  const [data, setData] = useState([]);
  // Используем хук состояния для хранения введенной даты
  const [date, setDate] = useState("");
  // Используем хук состояния для хранения введенной дистанции
  const [distance, setDistance] = useState("");

  // Определяем функцию для обработки отправки формы
  const handleSubmit = (e) => {
    // Предотвращаем обновление страницы при отправке формы
    e.preventDefault();
    // Проверяем, есть ли уже запись с такой датой
    const existingEntryIndex = data.findIndex((entry) => entry.date === date);
    if (existingEntryIndex !== -1) {
      // Если запись с такой датой уже существует, обновляем дистанцию
      const newData = [...data];
      newData[existingEntryIndex].distance += Number(distance);
      setData(newData);
    } else {
      // Если записи с такой датой нет, добавляем новую запись
      const newData = [...data, { date, distance: Number(distance) }];
      newData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData(newData);
    }
    // Очищаем поля формы
    setDate("");
    setDistance("");
  };

  // Определяем функцию для удаления записи
  const handleDelete = (index) => {
    // Создаем новый массив данных без удаленной записи
    const newData = [...data];
    newData.splice(index, 1);
    // Обновляем состояние данных
    setData(newData);
  };

  // Возвращаем JSX для отображения интерфейса
  return (
    <div>
      <div className="title">Учёт тренировок</div>
      <form className="form" onSubmit={handleSubmit}>
        
        <div>
          <label className="textForm" htmlFor="dateLabel">
            Дата(ДД.ММ.ГГ)
          </label>
          <input
            type="date"
            name="dateLabel"
            className="dateSize"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="textForm" htmlFor="numberLabel">
            Пройдено км
          </label>
          <input
            type="number"
            name="numberLabel"
            className="numberSize"
            min={0}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </div>
          <button className="buttonSize" type="submit">
            OK
          </button>
      </form>

      <table className="tableContainer">
        <thead className="tableHeader" >
          <tr className="trHeader" >
            <th className="tableText" >Дата(ДД.ММ.ГГ)</th>
            <th className="tableText" >Пройдено км</th>
            <th className="tableText" >Действия</th>
          </tr>
        </thead>
        <div className="tableBodyContainer">
          <tbody className="tbody">
          {data.map((item, index) => (
            <tr className="tr" key={index}>
              <td className="tableTextBody" >{new Date(item.date).toLocaleDateString('ru-RU')}</td>
              <td className="tableTextBody" >{item.distance}</td>
              <td className="tableTextBody" >
                <button id="buttonDelete" onClick={() => handleDelete(index)}>✘</button>
              </td>
            </tr>
          ))}
        </tbody>
        </div>
        
      </table>
    </div>
  );
}

// Экспортируем компонент App как модуль
export default FormStep;
