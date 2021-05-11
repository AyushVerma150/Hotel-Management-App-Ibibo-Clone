import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import Input from "UI/Input";
import Form from "UI/Form";
import Button from "UI/Button";
import { editUserFormValidators } from "Components/User/EditUserSchema";
import { userSignUpResponse } from "Components/User/UserSlice";

import otherConstants from "Constants/OtherConstants";
import styles from "./EditUser.module.css";

const EditUserProfile = (props) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState(null);
  const editStatus = useSelector((state) => state.user.status);
  const errorMsg = useSelector((state) => state.user.error);

  useEffect(() => {
    if (editStatus === otherConstants.successStatus) {
      setContent(
        <div className={styles.successStatusDiv}>
          <strong>{otherConstants.EditUserSuccess}</strong>
        </div>
      );
    } else if (editStatus === otherConstants.failedStatus) {
      setContent(
        <div className={styles.errorStatusDiv}>
          <strong>{errorMsg}</strong>
        </div>
      );
    }
  }, [editStatus, dispatch, errorMsg]);

  const formik = useFormik({
    initialValues: props.currentUser,
    validationSchema: editUserFormValidators,
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
          inputTitle={otherConstants.nameTitle}
          inputValue={formik.values.userName}
          blurred={formik.handleBlur}
          changed={formik.handleChange}
          errorMsg={formik.errors.userName}
          error={formik.touched.userName && formik.errors.userName}
          inputType={otherConstants.nameInput}
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
          type={otherConstants.fileInput}
          className={styles.fileInput}
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
          {otherConstants.editButton}
        </Button>
      </Form>
    </div>
  );
};
export default EditUserProfile;
