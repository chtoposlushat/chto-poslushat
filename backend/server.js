const express = require('express');
const cors = require('cors');
const app = express();

// Инициализируем "базу данных" (временное хранилище в памяти)
let tasks = [
  { id: 1, text: "Изучить React" },
  { id: 2, text: "Настроить Express" }
];

// Middleware
app.use(cors());
app.use(express.json()); // Важно! Позволяет читать JSON из запросов

// GET-запрос (уже есть)
app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
});

// 👇 Добавляем новый POST-запрос для создания задач
app.post('/api/tasks', (req, res) => {
  // Проверяем наличие текста
  if (!req.body.text || typeof req.body.text !== 'string') {
    return res.status(400).json({ 
      error: 'Текст задачи обязателен и должен быть строкой' 
    });
  }

  // Создаем задачу
  const newTask = {
    id: Date.now(),
    text: req.body.text.trim() // Удаляем лишние пробелы
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Запуск сервера
app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
import connectDB from './db.js';
import Review from './models/Review.js';

// После app.use(cors());
connectDB();

// Тестовый роут для проверки
app.get('/api/test-reviews', async (req, res) => {
  const testReview = new Review({
    title: "Тестовый обзор",
    artist: "Группа Пример",
    genre: "рок",
    content: "Это пример конструктивного обзора...",
    constructiveScore: 85
  });
  await testReview.save();
  res.json(testReview);
});
