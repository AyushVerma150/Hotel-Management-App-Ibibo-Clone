import { TextField } from '@material-ui/core';
import React from 'react';


const TextBox = ( props ) =>
{

    return <TextField
        onChange={props.changed}
        name={props.name}
        type={props.type}
        inputProps={props.inputProps}
        defaultValue={props.value}
    />

};

export default TextBox;