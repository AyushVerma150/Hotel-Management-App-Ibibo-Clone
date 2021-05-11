import React from "react";
import { Card } from "react-bootstrap";

import otherConstants from "Constants/OtherConstants";
import styles from "UI/UI.module.css";

const CardComponent = (props) => {
  return (
    <Card onClick={props.clicked} className={props.className}>
      <Card.Body>
        {props.image ? (
          <Card.Img src={props.image} className={props.imageStyle} />
        ) : null}
        {props.cardTitle.map((title) => {
          return title.type === otherConstants.cardComponentType ? (
            <Card.Title>{title.content}</Card.Title>
          ) : (
            <Card.Title>
              <div className={styles.cardTitleDiv}>
                <strong>{title.heading}</strong>
                <p>
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
