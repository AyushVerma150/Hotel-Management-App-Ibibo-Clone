import React from "react";
import { Carousel } from "react-bootstrap";

const CarouseComponent = (props) => {
  return (
    <Carousel fade className={props.className}>
      {props.imageData.map((image) => {
        return (
          <Carousel.Item>
            <img className={props.imageStyle} src={image} alt={props.altText} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouseComponent;
