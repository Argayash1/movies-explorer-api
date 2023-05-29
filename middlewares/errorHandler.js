const { INTERNAL_SERVER_ERROR_500, SERVER_ERROR_MESSAGE } = require('../utils/constants');

// Миддлвэр для централизованной обработки ошибок
const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === INTERNAL_SERVER_ERROR_500
        ? SERVER_ERROR_MESSAGE
        : message,
    });
  next();
};

module.exports = errorHandler;
