const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // за 15 минут
  max: 1000, // можно совершить максимум 100 запросов с одного IP
});

module.exports = limiter;
