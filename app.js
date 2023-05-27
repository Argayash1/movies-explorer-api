// Импорт модуля dotenv для добавления переменных окружения в process.env
require('dotenv').config();

// Импорт npm-пакетов
const express = require('express');
const mongoose = require('mongoose');

// Импорт миддлвэров
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');

// Импорт роутера
const router = require('./routes/index');

const { PORT, DB } = require('./utils/config');

const app = express();

// подключаемся к серверу mongo
mongoose.connect(DB, {
  useNewUrlParser: true,
});

app.use(corsHandler);

// Миддлвэры для безопасности (лимитер и хельмет)
app.use(limiter);
app.use(helmet());

// Миддлвэры для парсинга
app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Миддлвэр-логгер запросов
app.use(requestLogger); // подключаем логгер запросов

// Роутер
app.use(router);

// Миддлвэры для обработки ошибок
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизолванная обработка ошибок

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
