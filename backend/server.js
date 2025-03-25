const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Импорт моделей
const Review = require('./models/Review.js');
const Task = require('./models/Task.js'); // Создайте модель Task если нужно

// Инициализация Express
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://chto-poslushat.vercel.app',
    'http://localhost:3000' // Для локальной разработки
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// Подключение к MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB подключена');
  } catch (err) {
    console.error('Ошибка подключения к MongoDB:', err.message);
    process.exit(1);
  }
};
connectDB();

// Роуты для задач (пример)
app.route('/api/tasks')
  .get(async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  })
  .post(async (req, res) => {
    if (!req.body.text) {
      return res.status(400).json({ error: 'Текст обязателен' });
    }

    try {
      const newTask = new Task({
        text: req.body.text.trim()
      });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: 'Ошибка создания задачи' });
    }
  });

// Роуты для музыкальных обзоров
app.route('/api/reviews')
  .get(async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: 'Ошибка загрузки обзоров' });
    }
  })
  .post(async (req, res) => {
    try {
      const newReview = new Review({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        content: req.body.content,
        constructiveScore: req.body.constructiveScore
      });
      await newReview.save();
      res.status(201).json(newReview);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Тестовый роут
app.get('/api/test', (req, res) => {
  res.json({ message: "Сервер работает!" });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Не найдено' });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Режим: ${process.env.NODE_ENV || 'development'}`);
});
