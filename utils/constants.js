const httpConstants = require('http2').constants;

const {
  HTTP_STATUS_CREATED: CREATED_201,
  HTTP_STATUS_BAD_REQUEST: BAD_REQUEST_400,
  HTTP_STATUS_UNAUTHORIZED: UNAUTHORIZED_401,
  HTTP_STATUS_FORBIDDEN: FORBIDDEN_403,
  HTTP_STATUS_NOT_FOUND: NOT_FOUND_404,
  HTTP_STATUS_CONFLICT: CONFLICT_409,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_500,
} = httpConstants;

const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const VALIDATION_ERROR_MESSAGE = 'Некорректные данные:';

const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
const LOGIN_MESSAGE = 'Успешная авторизация';
const LOGOUT_MESSAGE = 'Вы вышли из системы';
const USER_NOT_FOUND_ERROR_MESSAGE = 'Такого пользователя нет';
const CAST_INCORRECT_USERID_ERROR_MESSAGE = 'Некорректный Id пользователя';

const FILM_NOT_FOUND_ERROR_MESSAGE = 'Такого фильма нет';
const FORBIDDEN_ERROR_MESSAGE = 'Можно удалять только собственные фильмы';
const DELETE_MOVIE_MESSAGE = 'Фильм удалён';
const CAST_INCORRECT_MOVIEID_ERROR_MESSAGE = 'Некорректный Id фильма';

const regEx = /https?:\/\/w{0,3}\.?[\w0-9-]{1,10}\.\w{2,3}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{0,}/m;

module.exports = {
  CREATED_201,
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  FORBIDDEN_403,
  NOT_FOUND_404,
  CONFLICT_409,
  INTERNAL_SERVER_ERROR_500,
  SERVER_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  CAST_INCORRECT_USERID_ERROR_MESSAGE,
  FILM_NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  DELETE_MOVIE_MESSAGE,
  CAST_INCORRECT_MOVIEID_ERROR_MESSAGE,
  regEx,
};
