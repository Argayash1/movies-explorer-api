const { CONFLICT_409 } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_409;
  }
}

module.exports = ConflictError;
