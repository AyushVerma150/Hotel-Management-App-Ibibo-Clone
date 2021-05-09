import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Form from 'UI/Form';
import Input from 'UI/Input';
import Button from 'UI/Button';
import { loginFormValues, loginFormValidators } from 'Components/User/LoginSchema';
import styles from './Login.module.css';
import { hideModal } from 'UI/Modal/ModalSlice';
import { userLoginResponse } from 'Components/User/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import otherConstants from 'Constants/OtherConstants';
const Login = () =>
{

    const dispatch = useDispatch();
    const errorMsg = useSelector( state => state.user.error );
    const loginStatus = useSelector( state => state.user.status );
    const [content, setContent] = useState( null );

    useEffect( () =>
    {
        if ( loginStatus === "success" )
        {
            setContent( <div style={{ height: "40px", width: "50%", fontFamily: "Poppins", color: "green", marginLeft: "25%" }}><strong>Login Success</strong></div> );
            setTimeout( () =>
            {
                dispatch( hideModal() );
            }, 2000 );
        }
        else if ( loginStatus === "failed" )
        {
            setContent( <div style={{ height: "40px", width: "50%", fontFamily: "Poppins", color: "red", marginLeft: "25%" }}><strong>Authentication Failed</strong></div> );
        }

    }, [loginStatus] );

    const [loginData, setLoginData] = useState( null );

    const handleLogin = ( values ) =>
    {
        dispatch( userLoginResponse( values ) );
    }

    const formik = useFormik(
        {
            initialValues: loginFormValues,
            validationSchema: loginFormValidators,
            onSubmit: ( values ) =>
            {
                handleLogin( values );
            }
        }
    );

    return (
        <div>
            {
                content
            }
            <Form submitHandler={formik.handleSubmit}>
                <Input
                    type={otherConstants.textInput}
                    inputTitle={otherConstants.emailTitle}
                    inputValue={formik.values.email}
                    blurred={formik.handleBlur}
                    changed={formik.handleChange}
                    errorMsg={formik.errors.email}
                    error={formik.touched.email && formik.errors.email}
                    inputType={otherConstants.emailInput}
                />
                <Input
                    type={otherConstants.passwordInput}
                    inputTitle={otherConstants.passwordTitle}
                    inputValue={formik.values.password}
                    blurred={formik.handleBlur}
                    changed={formik.handleChange}
                    errorMsg={formik.errors.password}
                    error={formik.touched.password && formik.errors.password}
                    inputType={otherConstants.passwordInput}
                />
                <Button
                    class={styles.btnStyle}
                    type={otherConstants.submitType}>
                    Login
                    </Button>
                <br />

            </Form>
        </div>
    )
};
export default Login;