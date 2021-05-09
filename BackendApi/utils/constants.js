const constants = {

    status: {
        ok: 200,
        unprocessable: 422,
        serverError: 500,
        notFound: 404,
        error: 400,
    },
    success:
    {
        authSuccess: 'Hello and welcome , You have successfully logged in',
    },
    error: {
        emailFailure: "email could not be sent",
        tokenFailure: "token could not be generated",
        userNameInvalid: "The Username entered is not valid",
        emailInvalid: "E-mail entered is invalid",
        passwordInvalid: "Not a valid Password",
        invalidContact: "Not a valid contact Number",
        authFailed: 'Authentication Failed , please enter valid credentials',
        userNotFound: "Invalid Credentials",
        passwordMismatch: "The password you have entered do not match",
        emailInUse: "The email entered is already in use",
        signUpFailed: "The entered details are not correct , hence Sign Up failed",
        cannotHash: "password could not be hashed",
        permissionDenied: "You are not allowed to access this page",
        pageError: "No such page found",
    },
    numericalValues:
    {
        hashCycles: 12,
        maxFileSize: 1024 * 1024 * 5,
        minLength: 7,
        maxLength: 20,
        maxFiles: 5,
        expiresIn: "1hr",
    },
    email:
    {
        htmlType: "html",
        textType: "text",
        sender: "verma15ayush@gmail.com",
        signupSuccess: "signup successful",
    }
    ,
    userType:
    {
        defaultAccess: "guest",
        higherAccess: "user",
        supremeAccess: "admin"
    },
    infoFile: {
        level: 'info',
        name: 'file.info',
    },
    errorFile:
    {
        level: 'error',
        name: 'file.error',
    },
    i18n:
    {
        welcomeMsg: "Welcome",
        chooseLanguage: "Language",
        authSuccess: "Success",
        authFailure: "Failure"
    }
};

module.exports = Object.freeze( constants );


