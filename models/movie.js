// Импорт пакетов
const mongoose = require('mongoose'); // импортируем mongoose

const { regEx } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'не передана страна создания фильма'],
    },
    director: {
      type: String,
      required: [true, 'не передан режиссёр фильма'],
    },
    duration: {
      type: Number,
      required: [true, 'не передана длительность фильма'],
    },
    year: {
      type: String,
      required: [true, 'не передан год создания фильма'],
    },
    description: {
      type: String,
      required: [true, 'не передано описание фильма'],
    },
    image: {
      type: String,
      required: [true, 'не передана ссылка на постер фильма'],
      validate: {
        // validator - функция проверки данных. v - значение свойства e-mail
        // если адрес e-mail не будет соответствовать формату, вернётся false
        validator(url) {
          return regEx.test(url);
        },
        message: 'ссылка не соответствует формату', // когда validator вернёт false, будет использовано это сообщение
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'не передана ссылка на трейлер фильма'],
      validate: {
        // validator - функция проверки данных. v - значение свойства e-mail
        // если адрес e-mail не будет соответствовать формату, вернётся false
        validator(url) {
          return regEx.test(url);
        },
        message: 'ссылка не соответствует формату', // тогда validator вернёт false, будет использовано это сообщение
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'не передана ссылка на миниатюрное изображение постера к фильму'],
      validate: {
        // validator - функция проверки данных. v - значение свойства e-mail
        // если адрес e-mail не будет соответствовать формату, вернётся false
        validator(url) {
          return regEx.test(url);
        },
        message: 'ссылка не соответствует формату', // когда validator вернёт false, будет использовано это сообщение
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'не передано  _id пользователя, который сохранил фильм'],
    },
    movieId: {
      type: Number,
      required: [true, 'не передано id фильма'],
    },
    nameRU: {
      type: String,
      required: [true, 'не передано название фильма на русском языке'],
    },
    nameEN: {
      type: String,
      required: [true, 'не передано название фильма на английском языке'],
    },
  },
  { versionKey: false },
);

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
