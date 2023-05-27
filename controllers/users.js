// Импорт классов ошибок из mongoose.Error
const { CastError, ValidationError } = require('mongoose').Error;

// Импорт модулей bcryptjs и jsonwebtoken
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken

// Импорт классов ошибок из конструкторов ошибок
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

// Импорт модели user
const User = require('../models/user'); // импортируем модель user

// Импорт статус-кодов ошибок
const { CREATED_201 } = require('../utils/constants');

// Импорт переменной секретного ключа
const { JWT_SECRET } = require('../utils/config');

// Функция, которая возвращает информацию о пользователе (email и имя)
const getCurrentUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

// Функция (контроллер) регистрации, которая создаёт пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash, // записываем хеш в базу
      name,
    }))
    // вернём записанные в базу данные
    .then((user) => res.status(CREATED_201).send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
        return;
      }
      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        next(new BadRequestError(`Некорректные данные: ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

// Функция (контроллер) аутентификации
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      // отправим токен, браузер сохранит его в куках
      res.cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true, // указали браузеру посылать куки, только если запрос с того же домена
      })
      // отправим токен пользователю
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из системы' });
};

// Функция, которая обновляет данные пользователя
const updateUserData = (req, res, next) => {
  const { _id: userId } = req.user;
  const { email, name } = req.body;

  // обновим имя найденного по _id пользователя
  User.findByIdAndUpdate(
    userId,
    { email, name }, // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
        return;
      }
      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        next(new BadRequestError(`Некорректные данные: ${errorMessage}`));
        return;
      }
      if (err instanceof CastError) {
        next(new BadRequestError('Некорректный Id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUserInfo,
  createUser,
  login,
  logout,
  updateUserData,
};
