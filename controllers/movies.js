// Импорт классов ошибок из mongoose.Error
const { CastError, ValidationError } = require('mongoose').Error;

// Импорт классов ошибок из конструкторов ошибок
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

// Импорт модели movie
const Movie = require('../models/movie');

// Импорт статус-кодов ошибок
const {
  CREATED_201,
  VALIDATION_ERROR_MESSAGE,
  FILM_NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  DELETE_MOVIE_MESSAGE,
  CAST_INCORRECT_MOVIEID_ERROR_MESSAGE,
} = require('../utils/constants');

// Функция, которая возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res, next) => {
  const { _id: userId } = req.user;

  Movie.find({ owner: userId })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

// Функция, которая создаёт фильм
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id: userId } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => movie.populate('owner'))
    // вернём записанные в базу данные
    .then((movie) => res.status(CREATED_201).send(movie))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        next(new BadRequestError(`${VALIDATION_ERROR_MESSAGE} ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

// Функция, которая удаляет карточку по идентификатору
const deleteMovieById = (req, res, next) => {
  const { _id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(FILM_NOT_FOUND_ERROR_MESSAGE);
      }
      if (userId !== movie.owner.toString()) {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ message: DELETE_MOVIE_MESSAGE }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(CAST_INCORRECT_MOVIEID_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
