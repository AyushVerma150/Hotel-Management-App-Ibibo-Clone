import * as Yup from 'yup';
import Errors from 'Constants/Error';
import otherConstants from 'Constants/OtherConstants';

export const loginFormValidators = Yup.object(
    {
        email:
            Yup.string()
                .email( Errors.emailInvalid )
                .required( Errors.requiredField ),
        password:
            Yup.string()
                .max( otherConstants.maxLength, Errors.maxLength )
                .min( otherConstants.minLength, Errors.minLength )
                .required( Errors.requiredField ),
    }
);
export const loginFormValues =
{
    email: "",
    password: "",

};