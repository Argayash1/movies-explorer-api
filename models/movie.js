// Импорт пакетов
const mongoose = require('mongoose'); // импортируем mongoose

// Импорт валидатора URL
const isUrl = require('validator/lib/isURL');

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
        // если url не соответствует формату, вернётся false
        validator: (url) => isUrl(url, { protocols: ['http', 'https'], require_protocol: true }),
        // когда validator вернёт false, будет использовано это сообщение
        message: 'некорректный формат ссылки на постер к фильму',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'не передана ссылка на трейлер фильма'],
      validate: {
        // validator - функция проверки данных. v - значение свойства e-mail
        // если url не соответствует формату, вернётся false
        validator: (url) => isUrl(url, { protocols: ['http', 'https'], require_protocol: true }),
        // тогда validator вернёт false, будет использовано это сообщение
        message: 'некорректный формат ссылки на трейлер фильма',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'не передана ссылка на миниатюрное изображение постера к фильму'],
      validate: {
        // validator - функция проверки данных. v - значение свойства e-mail
        // если url не соответствует формату, вернётся false
        validator: (url) => isUrl(url, { protocols: ['http', 'https'], require_protocol: true }),
        // когда validator вернёт false, будет использовано это сообщение
        message: 'некорректный формат ссылки на миниатюрное изображение постера к фильму',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'не передан _id пользователя, который сохранил фильм'],
    },
    movieId: {
      type: Number,
      required: [true, 'не передан id фильма'],
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
