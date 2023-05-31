const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../../utils/constants');

const movieDataValidator = celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regEx),
    trailerLink: Joi.string().required().regex(regEx),
    thumbnail: Joi.string().required().regex(regEx),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  movieDataValidator,
  movieIdValidator,
};
