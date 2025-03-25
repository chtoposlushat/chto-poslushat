const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Импорт моделей
const Review = require('./models/Review.js');
const Task = require('./models/Task.js');

// Инициализация Express
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://chto-poslushat.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Если нужно передавать куки/авторизацию
}));
app.use(express.json({ limit: '10mb' })); // Лимит для больших запросов
app.use(express.urlencoded({ extended: true }));

// Подключение к MongoDB с таймаутом
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Таймаут подключения 5 сек
      socketTimeoutMS: 45000 // Таймаут запросов 45 сек
    });
    console.log('MongoDB подключена');
  } catch (err) {
    console.error('Ошибка подключения к MongoDB:', err.message);
    // process.exit(1); // Убрал автоматический выход для облачного хостинга
  }
};
connectDB();

// Проверка подключения к БД перед запросами
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'База данных не готова' });
  }
  next();
});

// Роуты для задач
app.route('/api/tasks')
  .get(async (req, res) => {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 }).limit(100);
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка загрузки задач' });
    }
  })
  .post(async (req, res) => {
    if (!req.body.text?.trim()) {
      return res.status(400).json({ error: 'Текст обязателен' });
    }

    try {
      const newTask = new Task({
        text: req.body.text.trim(),
        createdAt: new Date()
      });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка создания задачи' });
    }
  });

// Роуты для музыкальных обзоров
app.route('/api/reviews')
  .get(async (req, res) => {
    try {
      const { genre } = req.query;
      const query = genre ? { genre } : {};
      
      const reviews = await Review.find(query)
        .sort({ createdAt: -1 })
        .limit(50);
        
      res.json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка загрузки обзоров' });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, artist, genre, content, constructiveScore } = req.body;
      
      if (!title || !artist || !genre || !content) {
        return res.status(400).json({ error: 'Все поля обязательны' });
      }

      const newReview = new Review({
        title,
        artist,
        genre,
        content,
        constructiveScore: Math.min(100, Math.max(0, constructiveScore || 0)),
        createdAt: new Date()
      });
      
      await newReview.save();
      res.status(201).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });

// Health check для мониторинга
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    db: dbStatus,
    timestamp: new Date()
  });
});

// Тестовый роут
app.get('/api/test', (req, res) => {
  res.json({ 
    message: "Сервер работает!",
    environment: process.env.NODE_ENV || 'development'
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Не найдено' });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Режим: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Сервер остановлен');
      process.exit(0);
    });
  });
});