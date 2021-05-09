import React from 'react';
import { Card } from 'react-bootstrap';


const CardComponent = ( props ) =>
{

    console.log( "card Component Props are  : ", props );

    return (

        <Card style={props.style} >
            <Card.Body>
                {
                    props.cardTitle.map( title =>
                    {
                        return <Card.Title>
                            <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                <strong style={{ fontFamily: "Poppins" }}>{title.heading}</strong>
                                <p
                                    style={{
                                        fontFamily: "Poppins",
                                        color: "black"
                                    }}>{title.para}</p>
                            </div>
                        </Card.Title>
                    } )
                }
            </Card.Body>
        </Card>
    );
};


export default CardComponent;
