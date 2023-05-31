// Импорт пакетов
const mongoose = require('mongoose'); // импортируем mongoose
const bcrypt = require('bcryptjs'); // импортируем bcrypt

// Импорт валидаторов
const isEmail = require('validator/lib/isEmail');

// Импорт классов ошибок
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INCORRECT_USERDATA_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
      type: String, // имя — это строка
      minlength: [2, 'длина имени пользователя должна быть не менее 2 символов'], // минимальная длина имени — 2 символа
      maxlength: [30, 'длина имени пользователя должна быть не более 30 символов'], // а максимальная — 30 символов
      required: [true, 'не передано имя пользователя'], // оно должно быть у каждого пользователя, так что e-mail — обязательное поле
    },
    email: {
      type: String,
      required: [true, 'не передан e-mail пользователя'], // оно должно быть у каждого пользователя, так что e-mail — обязательное поле
      unique: true,
      validate: {
      // validator - функция проверки данных. v - значение свойства e-mail
      // если адрес e-mail не будет соответствовать формату, вернётся false
        validator: (email) => isEmail(email),
        message: 'e-mail не соответствует формату', // когда validator вернёт false, будет использовано это сообщение
      },
    },
    password: {
      type: String,
      required: [true, 'не передан пароль пользователя'], // оно должно быть у каждого пользователя, так что пароль — обязательное поле
      select: false,
    },
  },
  // делаем, чтобы пароль не отправлялся при регистрации и отключаем поле "__v"
  { toJSON: { useProjection: true }, toObject: { useProjection: true }, versionKey: false },
);

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new UnauthorizedError(INCORRECT_USERDATA_MESSAGE));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INCORRECT_USERDATA_MESSAGE));
          }
          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
