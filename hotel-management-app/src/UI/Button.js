import React from 'react';

const button = ( props ) =>
{
    return (
        <button type={props.type} className={props.class} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default button;