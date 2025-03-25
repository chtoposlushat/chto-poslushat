import { useState, useEffect } from 'react';
import './App.css'; // Импортируем CSS файл

function App() {
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка данных при старте
  useEffect(() => {
    fetch('/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setError('Ошибка загрузки приветствия'));

    fetch('/api/tasks')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сервера');
        return res.json();
      })
      .then(data => setTasks(data.tasks))
      .catch(err => setError('Не удалось загрузить задачи'));
  }, []);

  // Отправка новой задачи
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!inputText.trim()) {
      setError('Введите текст задачи!');
      return;
    }

    setIsLoading(true);
    const newTask = { id: Date.now(), text: inputText };
    setTasks([...tasks, newTask]);
    setInputText('');

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTask.text })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка сохранения');
      }
    } catch (err) {
      setError(err.message);
      setTasks(tasks.filter(task => task.id !== newTask.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{message || 'Загрузка...'}</h1>

      {/* Блок ошибок */}
      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          ⚠️ {error}
          <button 
            onClick={handleSubmit}
            style={{ marginLeft: '10px' }}
          >
            Повторить
          </button>
        </div>
      )}

      <h2>Список задач:</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введите новую задачу"
          style={{ marginRight: '10px' }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            'Добавить'
          )}
        </button>
      </form>
    </div>
  );
}

export default App;
