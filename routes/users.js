// Импорт роутера
const router = require('express').Router();

// Импорт контроллеров
const {
  getCurrentUserInfo,
  updateUserData,
} = require('../controllers/users');

// Импорт валидаторов
const {
  userDataValidator,
} = require('../middlewares/validators/userValidator');

// Роутеры
router.get('/me', getCurrentUserInfo);

router.patch('/me', userDataValidator, updateUserData);

module.exports = router; // экспортировали этот роутер
