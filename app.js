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

const {
  NODE_ENV, PORT, DB, DB_DEV,
} = require('./utils/config');

const app = express();

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DB : DB_DEV, {
  useNewUrlParser: true,
});

// Миддлвэр для логирования запросов
app.use(requestLogger); // подключаем логгер запросов

// Миддлвэры для безопасности (лимитер, хельмет и корс-обработчик)
app.use(limiter);
app.use(helmet());
app.use(corsHandler);

// Миддлвэры для парсинга
app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Роутер
app.use(router);

// Миддлвэры для обработки ошибок
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизолванная обработка ошибок

app.listen(PORT);
