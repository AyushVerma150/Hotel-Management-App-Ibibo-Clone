const { body } = require("express-validator/check");
const constants = require("../utils/constants");
const { BadRequest } = require("../utils/errors");
const Request = require("../utils/request");
const Response = require("../utils/response");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const customValidation = require("../helpers/customValidator");

//validations for sign up
exports.signUp = [
  body(constants.userValidations.userName, constants.error.userNameInvalid)
    .isLength({ min: constants.numericalValues.minLength })
    .isLength({ max: constants.numericalValues.maxLength })
    .not()
    .isEmpty(),
  body(constants.userValidations.email, constants.error.emailInvalid)
    .normalizeEmail()
    .isEmail()
    .custom(async (value, { req }) => {
      const ack = await customValidation.isValidEmail(value, req);
      return ack;
    }),
  body(constants.userValidations.contact, constants.error.invalidContact)
    .isLength({ max: constants.userValidations.contactMaxLength })
    .isInt(),
  body(constants.userValidations.password, constants.error.passwordInvalid)
    .not()
    .isEmpty()
    .isLength({ min: constants.numericalValues.minLength })
    .isLength({ max: constants.numericalValues.maxLength }),
  body(
    constants.userValidations.confirmPassword,
    constants.error.passwordInvalid
  )
    .isLength({ min: constants.numericalValues.minLength })
    .isLength({ max: constants.maxLength })
    .not()
    .isEmpty()
    .custom(async (value, { req }) => {
      await customValidation.isPasswordConfirmed(value, req);
    }),
];

//validations for login
exports.login = [
  body(constants.userValidations.email).custom(async (value, { req, res }) => {
    response = new Response(res); //response handler
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      const handleRequest = new Request(req);
      let getData = { password: "" };
      const { password } = handleRequest.getBody(getData);
      const passwordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordValid) {
        throw new BadRequest(constants.error.authFailed);
      }
    } else if (!existingUser) {
      throw new BadRequest(constants.error.authFailed);
    }
  }),
];
