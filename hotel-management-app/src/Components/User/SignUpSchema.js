import * as Yup from 'yup';
import Errors from 'Constants/Error';
import otherConstants from 'Constants/OtherConstants';


export const signupFormValidators = Yup.object(
    {
        userName:
            Yup.string()
                .max( otherConstants.maxLength, Errors.maxLength )
                .min( otherConstants.minLength, Errors.minLength )
                .required( Errors.requiredField ),
        password:
            Yup.string()
                .max( otherConstants.maxLength, Errors.maxLength )
                .min( otherConstants.minLength, Errors.minLength )
                .required( Errors.requiredField ),
        confirmPassword:
            Yup.string()
                .test( otherConstants.customValidator,
                    Errors.passwordMismatch, function ( value )
                {
                    const { password } = this.parent;
                    return password === value;
                }
                ),
        email:
            Yup.string()
                .email( Errors.emailInvalid )
                .required( Errors.requiredField ),

    }
);
export const signupFormValues =
{
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    contact: "",
    file: ""
};