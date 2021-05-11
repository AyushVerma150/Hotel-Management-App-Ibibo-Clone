import React from "react";

import styles from "./UI.module.css";

const input = (props) => {
  let inputComponent = null;

  inputComponent = (
    <div className={styles.divStyle}>
      <label className={styles.labelStyle} htmlFor={props.inputType}>
        {props.inputTitle}
      </label>
      <br />
      <input
        className={styles.inputStyle}
        type={props.type}
        onChange={props.changed}
        onBlur={props.blurred}
        value={props.inputValue}
        id={props.inputType}
        name={props.inputType}
      />
      {props.error ? (
        <div className={styles.errorDiv}>{props.errorMsg}</div>
      ) : null}
    </div>
  );
  return inputComponent;
};

export default input;
