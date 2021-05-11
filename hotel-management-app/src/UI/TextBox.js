import React from "react";

import { TextField } from "@material-ui/core";

const TextBox = (props) => {
  return (
    <TextField
      onChange={props.changed}
      name={props.name}
      type={props.type}
      inputProps={props.inputProps}
      defaultValue={props.value}
    />
  );
};

export default TextBox;
