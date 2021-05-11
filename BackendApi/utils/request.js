const { BadRequest } = require("../utils/errors");
const constants = require("../utils/constants");

class Request {
  constructor(req) {
    this.req = req;
  }
  getBody(bodyData) {
    try {
      if (typeof bodyData !== constants.typeObject) {
        //some basic typechecking to avoid app crashing
        throw new BadRequest(constants.error.invalidType);
      }
      bodyData = this.req.body; //fill the bodyData object with all the body fields
      return bodyData;
    } catch (err) {
      throw new BadRequest(err);
    }
  }
  getFile(fileData) {
    try {
      if (typeof fileData !== constants.typeObject) {
        //some basic typechecking to avoid app crashing
        throw new BadRequest(constants.error.invalidType);
      }
      fileData = this.req.file; //fill the fileData with the req.file object
      return fileData;
    } catch (err) {
      throw new BadRequest(err);
    }
  }
  getHeader() {
    //code will be added upon the use of headers.
  }
}
module.exports = Request;
