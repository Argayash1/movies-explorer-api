const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../../utils/constants');

const cardDataValidator = celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regEx),
  }),
});

const cardIdValidator = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  cardDataValidator,
  cardIdValidator,
};
