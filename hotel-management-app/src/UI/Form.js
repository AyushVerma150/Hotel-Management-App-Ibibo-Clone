import React from "react";

const form = (props) => {
  return (
    <form style={props.style} onSubmit={props.submitHandler}>
      {props.children}
    </form>
  );
};
export default form;
