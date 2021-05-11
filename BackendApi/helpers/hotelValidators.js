const { body } = require("express-validator/check");
const constants = require("../utils/constants");
const { BadRequest } = require("../utils/errors");
const Request = require("../utils/request");
const Response = require("../utils/response");
const Hotel = require("../model/hotel");

exports.addHotel = [
  body(constants.hotelValidations.type, constants.hotelValidations.typeError)
    .not()
    .isEmpty(),
  body(constants.hotelValidations.name, constants.hotelValidations.nameError)
    .isLength({ min: constants.numericalValues.minLength })
    .isLength({ max: constants.numericalValues.maxLength })
    .not()
    .isEmpty()
    .custom(async (value, { req, res }) => {
      response = new Response(res); //response handler
      const existingHotel = await Hotel.findOne({
        where: { name: req.body.name },
      });
      if (existingHotel) {
        throw new Error(constants.hotelValidations.nameExists);
      }
    }),
  body(
    constants.hotelValidations.location,
    constants.hotelValidations.locationError
  )
    .not()
    .isEmpty(),
  body(
    constants.hotelValidations.landmark,
    constants.hotelValidations.landmarkError
  )
    .not()
    .isEmpty(),
];
