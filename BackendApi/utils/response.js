const { BadRequest } = require("../utils/errors");
//response class to handle response message and errors..
class Response {
  constructor(res) {
    this.res = res;
  }
  setMessage(msg, status) {
    //sending message using res.json with status..
    try {
      this.res
        .status(status)
        .json({
          message: msg,
          status: status,
        })
        .end();
    } catch (err) {
      throw new BadRequest(err);
    }
  }
  setError(error, status) {
    //sending error using res.json with status..
    try {
      this.res
        .json({
          message: error,
          status: status,
        })
        .end();
    } catch (err) {
      throw new BadRequest(err);
    }
  }
  setData(data, message, status) {
    //sending message along with data using res.json with status..
    try {
      this.res
        .status(status)
        .json({
          status: status,
          data: data,
          message: message,
        })
        .end();
    } catch (err) {
      throw new BadRequest(err);
    }
  }
}

module.exports = Response;
