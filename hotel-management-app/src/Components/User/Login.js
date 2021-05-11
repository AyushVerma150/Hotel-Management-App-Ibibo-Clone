import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFormik } from "formik";
import Form from "UI/Form";
import Input from "UI/Input";
import Button from "UI/Button";
import {
  loginFormValues,
  loginFormValidators,
} from "Components/User/LoginSchema";
import styles from "./Login.module.css";
import { hideModal } from "UI/Modal/ModalSlice";
import { userLoginResponse, setStatus } from "Components/User/UserSlice";

import editStyles from "Components/User/EditUser.module.css";
import otherConstants from "Constants/OtherConstants";

const Login = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.user.error);
  const loginStatus = useSelector((state) => state.user.status);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (loginStatus === otherConstants.successStatus) {
      setContent(
        <div className={editStyles.successStatusDiv}>
          <strong>{otherConstants.loginSuccess}</strong>
        </div>
      );
      setTimeout(() => {
        dispatch(setStatus());
        dispatch(hideModal());
      }, otherConstants.timeout);
    } else if (loginStatus === otherConstants.failedStatus) {
      setContent(
        <div className={otherConstants.errorStatusDiv}>
          <strong>{errorMsg}</strong>
        </div>
      );
    }
  }, [loginStatus, dispatch, errorMsg]);

  const handleLogin = (values) => {
    dispatch(userLoginResponse(values));
  };

  const formik = useFormik({
    initialValues: loginFormValues,
    validationSchema: loginFormValidators,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div>
      {content}
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
        <Button class={styles.btnStyle} type={otherConstants.submitType}>
          Login
        </Button>
        <br />
      </Form>
    </div>
  );
};
export default Login;
