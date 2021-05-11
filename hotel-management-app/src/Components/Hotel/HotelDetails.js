import React from "react";

import { Carousel, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";

import CardComponent from "UI/CardComponent";
import styles from "Components/Hotel/Hotel.module.css";
import otherConstants from "Constants/OtherConstants";

const HotelDetail = (props) => {
  let roomsCount = 0;
  const hotelImages = otherConstants.hotelImages;
  const hotelWithRoom = useSelector((state) => state.hotel.hotelWithRooms);
  const hotel = useSelector((state) =>
    state.hotel.hotels.find((hotel) => hotel.name === props.hotelName)
  );

  const filteredSearch = useSelector((state) => state.hotel.filteredSearch);
  const guests = filteredSearch.adults + filteredSearch.children;
  const rooms = filteredSearch.rooms;
  const minGuestsInRoom = guests / rooms;

  let roomsAvailable = [];
  if (hotelWithRoom.rooms) {
    roomsAvailable = hotelWithRoom.rooms.filter((room) => {
      if (room.capacity >= minGuestsInRoom) return true;
      else return false;
    });
  }

  if (roomsAvailable.length >= 1) {
    roomsCount = roomsAvailable.length;
  }

  return (
    <div className={styles.singleHotelViewMainInnerDiv}>
      <div className={styles.singleHotelViewLeftAlignedDiv}>
        <Carousel fade>
          {hotelImages.map((image) => {
            return (
              <Carousel.Item>
                <img
                  className={styles.carouselImageStyling}
                  src={image}
                  alt={otherConstants.imageAlt}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className={styles.outerCardComponentMain}>
        <div className={styles.innerCardComponentMain}>
          <div className={styles.innerCardComponentAlignedLeft}>
            <CardComponent
              className={styles.hotelInfoCardStyling}
              cardTitle={[
                {
                  heading: otherConstants.hotelName,
                  para: hotel.name,
                },
                {
                  heading: otherConstants.hotelLocation,
                  para: hotel.location,
                  icon: otherConstants.locationIcon,
                },
                {
                  heading: otherConstants.landmark,
                  para: hotel.landmark,
                  icon: otherConstants.landmarkIcon,
                },
                {
                  heading: otherConstants.hotelType,
                  para: hotel.type,
                  icon: otherConstants.hotelIcon,
                },
              ]}
            />
          </div>
          <div className={styles.rightAlignedDiv}>
            <CardComponent
              className={styles.hotelInfoCardStyling}
              cardTitle={[
                {
                  type: otherConstants.cardComponentType,
                  content: (
                    <div className={styles.specialDivStyling}>
                      <strong>
                        {otherConstants.breakfastIcon}
                        {otherConstants.breakfastHeading}
                      </strong>
                    </div>
                  ),
                },
                {
                  type: otherConstants.cardComponentType,
                  content: (
                    <div className={styles.specialDivStyling}>
                      <strong>
                        {otherConstants.internetIcon}
                        {otherConstants.internetHeading}
                      </strong>
                    </div>
                  ),
                },
                { heading: otherConstants.pricingHeading },
                {
                  type: otherConstants.cardComponentType,
                  content: (
                    <div className={styles.specialDivStyling}>
                      <p>Pricing Starts At</p>
                      <p>
                        {otherConstants.originalPrice}
                        <strong>
                          <s>
                            {otherConstants.ruppeeIcon}
                            {hotel.discountPrice}
                          </s>
                        </strong>
                      </p>
                      <p>
                        {otherConstants.discountPrice}
                        <strong>
                          {otherConstants.ruppeeIcon}
                          {hotel.startPrice}
                        </strong>
                      </p>
                    </div>
                  ),
                },
                {
                  type: otherConstants.cardComponentType,
                  content: (
                    <div className={styles.roomOptionsOuterDiv}>
                      <Button className={styles.roomsOptionButton}>
                        <Link
                          to={otherConstants.roomsSection}
                          spy={true}
                          smooth={true}
                        >
                          <strong>
                            {roomsAvailable.length >= 1 ? (
                              <div>
                                <p>View {roomsCount} Room Options </p>
                                {otherConstants.angleIcon}
                              </div>
                            ) : (
                              <p> {otherConstants.soldOut}</p>
                            )}
                          </strong>
                        </Link>
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
