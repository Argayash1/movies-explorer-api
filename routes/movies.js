// Импорт роутера
const router = require('express').Router();

// Импорт контроллеров
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

// Импорт валидаторов
const {
  movieDataValidator,
  movieIdValidator,
} = require('../middlewares/validators/movieValidator');

// Роутеры
router.get('/', getMovies);

router.post('/', movieDataValidator, createMovie);

router.delete('/:_id', movieIdValidator, deleteMovieById);

module.exports = router; // экспортировали этот роутер
