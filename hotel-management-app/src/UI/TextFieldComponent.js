import React from "react";
import TextField from "@material-ui/core/TextField";

const TextFieldComponent = (props) => {
  return (
    <TextField
      onClick={props.clicked}
      onChange={props.changed}
      name={props.name}
      id={props.id}
      type={props.type}
      defaultValue={props.defaultValue}
      value={props.value}
      inputProps={props.inputProps}
      placeholder={props.placeholder}
      {...props.params}
    />
  );
};

export default TextFieldComponent;
