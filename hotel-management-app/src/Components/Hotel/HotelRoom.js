import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "UI/Button";
import CardComponent from "UI/CardComponent";
import { setHotelSelected } from "Components/Hotel/HotelSlice";

import styles from "Components/Hotel/Hotel.module.css";
import otherConstants from "Constants/OtherConstants";

const HotelRoom = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const roomImages = otherConstants.roomImages;

  const currentUser = useSelector((state) => state.user.currentUser);
  const hotelWithRoom = useSelector((state) => state.hotel.hotelWithRooms);
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

  const handleSelectRoom = (roomInfo) => {
    let hotelInfo = {
      ...hotelWithRoom,
      ...roomInfo,
      ...filteredSearch,
    };
    dispatch(setHotelSelected(hotelInfo));
    history.push(otherConstants.checkoutPath);
  };

  return (
    <div>
      {/* 
      This Section Allows To Display Rooms Fetched of The Hotels If Available */}
      {roomsAvailable.map((room) => {
        return (
          <div className={styles.singleRoomDiv}>
            <div className={styles.carouselHotelDiv}>
              <Carousel fade className={styles.carouselStyle}>
                {roomImages.map((image) => {
                  return (
                    <Carousel.Item>
                      <img
                        className={styles.CarouselDisplayImage}
                        src={image}
                        alt={otherConstants.imageAlt}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
            <div className={styles.outerCardDiv}>
              <div className={styles.cardStyling}>
                <div className={styles.locationDiv}>
                  <CardComponent
                    className={styles.singleHotelViewCard}
                    cardTitle={[
                      { heading: otherConstants.roomInfo },
                      { heading: otherConstants.hotelType, para: room.type },
                      { heading: otherConstants.capacity, para: room.capacity },
                      { heading: otherConstants.bedSize, para: room.bedSize },
                      { heading: otherConstants.area, para: room.area },
                    ]}
                  />
                </div>

                <div className={styles.pricingDiv}>
                  <CardComponent
                    className={styles.priceInfoDiv}
                    cardTitle={[
                      {
                        heading: otherConstants.pricingInfo,
                      },
                      {
                        heading: otherConstants.originalPrice,
                        para: room.price,
                        icon: otherConstants.ruppeeIcon,
                      },
                      {
                        heading: otherConstants.discountPrice,
                        para: room.discountPrice,
                        icon: otherConstants.ruppeeIcon,
                      },
                      {
                        type: otherConstants.cardComponentType,
                        content: (
                          <div>
                            <Button
                              disabled={!currentUser ? true : false}
                              clicked={() => {
                                handleSelectRoom(room);
                              }}
                              class={styles.roomSelectButton}
                            >
                              <strong>{otherConstants.selectRoom}</strong>
                            </Button>
                            <br />
                            <br />
                            {!currentUser ? (
                              <p>
                                <strong>{otherConstants.note}</strong>
                                {otherConstants.noteText}
                              </p>
                            ) : null}
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
      })}
    </div>
  );
};

export default HotelRoom;
