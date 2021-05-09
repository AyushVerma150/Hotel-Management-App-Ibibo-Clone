import { Check } from '@material-ui/icons';
import React from 'react';
import
{
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';

const CheckBoxControl = ( props ) =>
{
    return (
        <FormControlLabel
            className={props.class}
            control={
                <Checkbox
                    checked={props.checked}
                    onChange={props.changed}
                    name={props.name}

                />}
            label={props.label}
        />
    );

}


export default CheckBoxControl;

