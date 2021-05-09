import React, { useEffect, useState } from 'react';
import Input from '../../UI/Input';
import { useFormik } from 'formik';
import Form from '../../UI/Form';
import Button from '../../UI/Button';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Signup.module.css';
import { signupFormValidators, signupFormValues } from 'Components/User/SignUpSchema';
import { userSignUpResponse } from 'Components/User/UserSlice';
import { hideModal } from 'UI/Modal/ModalSlice';
import { Link, useHistory } from "react-router-dom";
import errorConstants from 'Constants/Error';
import otherConstants from 'Constants/OtherConstants';
let clearForm;
const Signup = () =>
{
    const dispatch = useDispatch();
    let history = useHistory();
    const [content, setContent] = useState( null );
    const signupStatus = useSelector( state => state.user.status );
    const errorMsg = useSelector( state => state.user.error );

    // const [registrationState, setRegistrationState] = useState( successConstants.idleState );
    // const signupStatus = useSelector( state => state.signup.status );
    // const error = useSelector( state => state.signup.error );

    //Tracking the status of signup from backend
    useEffect( () =>
    {
        if ( signupStatus === "success" )
        {
            setContent( <div style={{ height: "40px", width: "50%", fontFamily: "Poppins", color: "green", marginLeft: "25%" }}><strong>Sign Up Success</strong></div> );
            setTimeout( () =>
            {
                dispatch( hideModal() )
            }, 2000 );
        }
        else if ( signupStatus === "failed" )
        {
            setContent( <div style={{ height: "40px", width: "50%", fontFamily: "Poppins", color: "red", marginLeft: "25%" }}><strong>{errorMsg}</strong></div> );
        }
    }, [signupStatus] );

    const formik = useFormik(
        {
            initialValues: signupFormValues,
            validationSchema: signupFormValidators,
            onSubmit: ( values, { resetForm } ) =>
            {
                console.log( values );
                dispatch( userSignUpResponse( values ) );
            }
        }
    );


    return (
        <div className={styles.divStyle}>
            {
                content
            }
            <Form className={styles.formStyle} submitHandler={formik.handleSubmit}>
                <Input
                    type={otherConstants.textInput}
                    inputTitle={otherConstants.emailTitle}
                    inputValue={formik.values.email}
                    blurred={formik.handleBlur}
                    changed={formik.handleChange}
                    errorMsg={formik.errors.email}
                    error={formik.touched.email && formik.errors.email}
                    inputType={otherConstants.emailInput} />
                <Input
                    type={otherConstants.textInput}
                    inputTitle={otherConstants.nameTitle}
                    inputValue={formik.values.userName}
                    blurred={formik.handleBlur}
                    changed={formik.handleChange}
                    errorMsg={formik.errors.userName}
                    error={formik.touched.userName && formik.errors.userName}
                    inputType={otherConstants.nameInput} />
                <Input
                    type={otherConstants.passwordInput}
                    inputTitle={otherConstants.passwordTitle}
                    inputValue={formik.values.password}
                    blurred={formik.handleBlur}
                    changed={formik.handleChange}
                    errorMsg={formik.errors.password}
                    error={formik.touched.password && formik.errors.password}
                    inputType={otherConstants.passwordInput} />
                <Input
                    type={otherConstants.passwordInput}
                    inputTitle={otherConstants.confirmPasswordTitle}
                    inputValue={formik.values.confirmPassword}
                    blurred={formik.handleBlur}
                    changed={formik.handleChange}
                    errorMsg={formik.errors.confirmPassword}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    inputType={otherConstants.confirmPasswordInput} />
                <Input
                    type={otherConstants.textInput}
                    inputTitle={otherConstants.contactTitle}
                    inputValue={formik.values.contact}
                    blurred={formik.handleBlur}
                    changed={formik.handleChange}
                    errorMsg={formik.errors.password}
                    error={formik.touched.contact && formik.errors.contact}
                    inputType={otherConstants.contactInput} />
                <input
                    style={{ marginLeft: "25%", marginTop: "10px", marginBottom: "10px" }}
                    type={otherConstants.fileInput}
                    name={otherConstants.fileInput}
                    onChange=
                    {( event ) =>
                    {
                        formik.setFieldValue( otherConstants.fileInput, URL.createObjectURL( event.target.files[0] ) );
                    }
                    }
                />
                <br />
                <Button
                    class={styles.btnStyle}
                    disabled={!formik.isValid}
                    type={otherConstants.submitType} >
                    Register
                </Button>
            </Form>
        </div >
    );
}
export default Signup;