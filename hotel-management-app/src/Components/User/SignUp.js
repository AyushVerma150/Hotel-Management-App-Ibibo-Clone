import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import Input from "UI/Input";
import Form from "UI/Form";
import Button from "UI/Button";
import editStyles from "Components/User/EditUser.module.css";
import {
  signupFormValidators,
  signupFormValues,
} from "Components/User/SignUpSchema";
import { userSignUpResponse, setStatus } from "Components/User/UserSlice";
import { hideModal } from "UI/Modal/ModalSlice";

import styles from "./Signup.module.css";
import otherConstants from "Constants/OtherConstants";

const Signup = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const signupStatus = useSelector((state) => state.user.status);
  const errorMsg = useSelector((state) => state.user.error);

  //Tracking the status of signup from backend
  useEffect(() => {
    if (signupStatus === otherConstants.successStatus) {
      setContent(
        <div className={editStyles.successStatusDiv}>
          <strong>{otherConstants.signupSuccess}</strong>
        </div>
      );
      setTimeout(() => {
        dispatch(setStatus());
        dispatch(hideModal());
      }, otherConstants.timeout);
    } else if (signupStatus === otherConstants.failedStatus) {
      setContent(
        <div classNam={editStyles.errorStatusDiv}>
          <strong>{errorMsg}</strong>
        </div>
      );
    }
  }, [signupStatus, dispatch, errorMsg]);

  const formik = useFormik({
    initialValues: signupFormValues,
    validationSchema: signupFormValidators,
    onSubmit: (values, { resetForm }) => {
      dispatch(userSignUpResponse(values));
    },
  });

  return (
    <div className={styles.divStyle}>
      {content}
      <Form className={styles.formStyle} submitHandler={formik.handleSubmit}>
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
          type={otherConstants.textInput}
          inputTitle={otherConstants.nameTitle}
          inputValue={formik.values.userName}
          blurred={formik.handleBlur}
          changed={formik.handleChange}
          errorMsg={formik.errors.userName}
          error={formik.touched.userName && formik.errors.userName}
          inputType={otherConstants.nameInput}
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
        <Input
          type={otherConstants.passwordInput}
          inputTitle={otherConstants.confirmPasswordTitle}
          inputValue={formik.values.confirmPassword}
          blurred={formik.handleBlur}
          changed={formik.handleChange}
          errorMsg={formik.errors.confirmPassword}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          inputType={otherConstants.confirmPasswordInput}
        />
        <Input
          type={otherConstants.textInput}
          inputTitle={otherConstants.contactTitle}
          inputValue={formik.values.contact}
          blurred={formik.handleBlur}
          changed={formik.handleChange}
          errorMsg={formik.errors.password}
          error={formik.touched.contact && formik.errors.contact}
          inputType={otherConstants.contactInput}
        />
        <input
          className={editStyles.fileInput}
          type={otherConstants.fileInput}
          name={otherConstants.fileInput}
          onChange={(event) => {
            formik.setFieldValue(
              otherConstants.fileInput,
              URL.createObjectURL(event.target.files[0])
            );
          }}
        />
        <br />
        <Button
          class={styles.btnStyle}
          disabled={!formik.isValid}
          type={otherConstants.submitType}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};
export default Signup;
