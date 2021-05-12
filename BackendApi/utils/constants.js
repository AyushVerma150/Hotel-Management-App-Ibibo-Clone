const constants = {
  status: {
    ok: 200,
    unprocessable: 422,
    serverError: 500,
    notFound: 404,
    error: 400,
  },
  success: {
    authSuccess: "Hello and welcome , You have successfully logged in",
    editUser: "Success In Editing User Details",
  },
  error: {
    emailFailure: "email could not be sent",
    tokenFailure: "token could not be generated",
    userNameInvalid: "The Username entered is not valid",
    emailInvalid: "E-mail entered is invalid",
    passwordInvalid: "Not a valid Password",
    invalidContact: "Not a valid contact Number",
    authFailed: "Authentication Failed , please enter valid credentials",
    userNotFound: "Invalid Credentials",
    passwordMismatch: "The password you have entered do not match",
    emailInUse: "The email entered is already in use",
    signUpFailed: "The entered details are not correct , hence Sign Up failed",
    cannotHash: "password could not be hashed",
    permissionDenied: "You are not allowed to access this page",
    pageError: "No such page found",
    editUserFailed: "Failure",
  },
  numericalValues: {
    hashCycles: 12,
    maxFileSize: 1024 * 1024 * 5,
    minLength: 7,
    maxLength: 20,
    maxFiles: 5,
    expiresIn: "1hr",
  },
  email: {
    htmlType: "html",
    textType: "text",
    sender: "verma15ayush@gmail.com",
    signupSuccess: "signup successful",
  },
  userType: {
    defaultAccess: "guest",
    higherAccess: "user",
    supremeAccess: "admin",
  },
  infoFile: {
    level: "info",
    name: "file.info",
  },
  errorFile: {
    level: "error",
    name: "file.error",
  },
  i18n: {
    welcomeMsg: "Welcome",
    chooseLanguage: "Language",
    authSuccess: "Success",
    authFailure: "Failure",
  },
  roomAttributes: [
    "type",
    "price",
    "discountPrice",
    "bedSize",
    "capacity",
    "area",
  ],
  userAttributes: ["userName", "email", "userImage"],
  filterForHotels: {
    maxRange: 50000,
    minRange: 0,
    amenity: null,
    hotelType: "hotel",
  },
  typesOfHotel: { hotel: "hotel", motel: "motel", villa: "villa" },
  expiryTime: "1h",

  hotelValidations: {
    type: "type",
    name: "name",
    location: "location",
    landmark: "landmark",
    nameError: "Hotel Name is not Valid",
    nameExists: "Hotel with this name already Exits",
    landmarkError: "Landmark is Valid",
    locationError: "Location is not Valid",
    typeError: "Type is not valid",
  },
  userValidations: {
    userName: "userName",
    email: "email",
    password: "password",
    confirmPassword: "confirmPassword",
    contact: "contact",
    contactMaxLength: 10,
  },
  typeObject: "object",
  validImageTpes: {
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
  },
  adminRolesAllowed: ["edit", "delete", "update", "create"],
  userRolesAllowed: ["signup", "login", "view"],
  guestRolesAllowed: ["view"],

  signnUpEmail: (
    <h1>
      <p>Welcome to AvHotels.IN</p>
      <strong>You have successfully Signed up</strong>
    </h1>
  ),
};

module.exports = Object.freeze(constants);
