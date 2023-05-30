// Импорт модуля jsonwebtoken
const jwt = require('jsonwebtoken');

// Импорт переменной секретного ключа
const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require('../utils/config');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  // извлечём токен и сохраняем его в переменную
  const token = req.cookies.jwt;

  // убеждаемся, что он есть
  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
