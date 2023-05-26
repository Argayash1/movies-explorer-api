const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB } = require('./utils/config');

const app = express();

// подключаемся к серверу mongo
mongoose.connect(DB, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
