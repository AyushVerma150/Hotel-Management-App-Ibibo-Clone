const constants = require("../utils/constants");
class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return constants.status.error;
    }
    if (this instanceof NotFound) {
      return constants.status.notFound;
    }
    return constants.status.serverError;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
};
