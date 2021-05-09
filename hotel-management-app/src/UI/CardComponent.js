import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = (props) => {
  return (
    <Card
      style={props.style}
      onClick={props.clicked}
      className={props.className}
    >
      <Card.Body>
        {props.image ? (
          <Card.Img src={props.image} className={props.imageStyle}></Card.Img>
        ) : null}
        {props.cardTitle.map((title) => {
          return title.type === "button" ? (
            <Card.Title>{title.content}</Card.Title>
          ) : (
            <Card.Title>
              <div
                style={{ display: "block", fontSize: "1rem", color: "black" }}
              >
                <strong style={{ fontFamily: "Poppins" }}>
                  {title.heading}
                </strong>
                <p
                  style={{
                    fontFamily: "Poppins",
                    color: "black",
                  }}
                >
                  {title.icon}
                  {title.para}
                </p>
              </div>
            </Card.Title>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
