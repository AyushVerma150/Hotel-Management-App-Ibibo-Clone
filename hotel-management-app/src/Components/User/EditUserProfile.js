import React, { useEffect, useState } from "react";
import Input from "../../UI/Input";
import { useFormik } from "formik";
import Form from "../../UI/Form";
import Button from "../../UI/Button";
import { useSelector, useDispatch } from "react-redux";
import styles from "./EditUser.module.css";
import {
  editUserFormValidators,
  editUserFormValues,
} from "Components/User/EditUserSchema";
import { userSignUpResponse } from "Components/User/UserSlice";
import { hideModal } from "UI/Modal/ModalSlice";
import { Link, useHistory } from "react-router-dom";
import errorConstants from "Constants/Error";
import otherConstants from "Constants/OtherConstants";

let clearForm;
const EditUserProfile = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [content, setContent] = useState(null);
  const editStatus = useSelector((state) => state.user.status);
  const errorMsg = useSelector((state) => state.user.error);

  useEffect(() => {
    if (editStatus === "success") {
      setContent(
        <div
          style={{
            height: "40px",
            width: "50%",
            fontFamily: "Poppins",
            color: "green",
            marginLeft: "25%",
          }}
        >
          <strong>Sign Up Success</strong>
        </div>
      );
      setTimeout(() => {
        dispatch(hideModal());
      }, 2000);
    } else if (editStatus === "failed") {
      setContent(
        <div
          style={{
            height: "40px",
            width: "50%",
            fontFamily: "Poppins",
            color: "red",
            marginLeft: "25%",
          }}
        >
          <strong>{errorMsg}</strong>
        </div>
      );
    }
  }, [editStatus]);

  const formik = useFormik({
    initialValues: props.currentUser,
    validationSchema: editUserFormValidators,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(userSignUpResponse(values));
    },
  });

  return (
    <div className={styles.divStyle}>
      {/* {content} */}
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
          style={{ marginLeft: "25%", marginTop: "10px", marginBottom: "10px" }}
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
          Edit User
        </Button>
      </Form>
    </div>
  );
};
export default EditUserProfile;
