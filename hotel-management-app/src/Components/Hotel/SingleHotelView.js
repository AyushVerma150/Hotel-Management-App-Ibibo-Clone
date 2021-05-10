import React, { useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import styles from "Components/Hotel/Hotel.module.css";
import { Link } from "react-scroll";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHotelWithRooms,
  fetchHotelReviews,
  setHotelSelected,
} from "Components/Hotel/HotelSlice";
import CardComponent from "UI/CardComponent";

const SingleHotelView = ({ match }) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { hotelName } = match.params;
  let roomsCount = null;
  const hotelWithRoom = useSelector((state) => state.hotel.hotelWithRooms);
  const currentHotelReviews = useSelector(
    (state) => state.hotel.currentHotelReviews
  );
  const filteredSearch = useSelector((state) => state.hotel.filteredSearch);
  const guests = filteredSearch.adults + filteredSearch.children;
  const rooms = filteredSearch.rooms;
  const minGuestsInRoom = guests / rooms;
  const hotel = useSelector((state) =>
    state.hotel.hotels.find((hotel) => hotel.name === hotelName)
  );
  let roomComponent = null;
  let reviewComponent = null;
  const dispatch = useDispatch();

  const handleSelectRoom = (roomInfo) => {
    let hotelInfo = {
      ...hotelWithRoom,
      ...roomInfo,
      ...filteredSearch,
    };
    dispatch(setHotelSelected(hotelInfo));
    history.push("/checkout");
  };

  useEffect(() => {
    dispatch(fetchHotelWithRooms({ hotelId: hotel.id }));
    dispatch(fetchHotelReviews({ hotelId: hotel.id }));
  }, []);
  const hotelImages = [
    "https://cdn1.goibibo.com/voy_ing/t_g/106925c06e9911e7bdee025f77df004f.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_g/5a89674e15ab11eaa7340242ac110003.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_g/e63a316e83d911ea96850242ac110005.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_g/81ad700a81ee11e486f9daf4768ad8d9.jfif",
  ];
  const roomImages = [
    "https://cdn1.goibibo.com/voy_ing/t_fs/7036681c138a11ea9e570242ac110003.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_fs/7067c4c0138a11eaba540242ac110002.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_fs/7070e762138a11eaa6430242ac110004.jpg",
  ];

  let roomsAvailable = [];
  if (hotelWithRoom.rooms) {
    roomsAvailable = hotelWithRoom.rooms.filter((room) => {
      if (room.capacity >= minGuestsInRoom) return true;
      else return false;
    });
  }

  if (roomsAvailable.length >= 1) {
    roomsCount = roomsAvailable.length;
    roomComponent = roomsAvailable.map((room) => {
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
                      alt="Not Available"
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
                    { heading: "Room Information", para: "" },
                    { heading: "Type", para: room.type },
                    { heading: "Capacity", para: room.capacity },
                    { heading: "Bed Size", para: room.bedSize },
                    { heading: "Area", para: room.area },
                  ]}
                />
              </div>

              <div className={styles.pricingDiv}>
                <CardComponent
                  style={{ height: "300px", border: "none" }}
                  cardTitle={[
                    {
                      heading: "Pricing Information",
                      para: "",
                    },
                    {
                      heading: "Original Price",
                      para: room.price,
                      icon: <i class="fas fa-rupee-sign"></i>,
                    },
                    {
                      heading: "Discount Price",
                      para: room.discountPrice,
                      icon: <i class="fas fa-rupee-sign"></i>,
                    },
                    {
                      heading: "",
                      para: "",
                      type: "button",
                      content: (
                        <div>
                          <Button
                            disabled={!currentUser ? true : false}
                            onClick={() => {
                              handleSelectRoom(room);
                            }}
                            className={styles.roomSelectButton}
                          >
                            <strong>Select Room</strong>
                          </Button>
                          <br />
                          <br />
                          {!currentUser ? (
                            <p>
                              <strong>Note</strong> You must Login / signup
                              before Selecting Room
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
    });
  } else {
    roomComponent = "No rooms Available with such requirements";
  }

  if (currentHotelReviews) {
    reviewComponent = currentHotelReviews.map((review) => {
      return (
        <div className={styles.hotelReviewOuterDiv}>
          <div classname={styles.hotelreviewinnerdiv}>
            <img
              src={review.user.userImage}
              alt="BigCo Inc. logo"
              className={styles.reviewImageStyle}
            />
            <label className={styles.imageLabel}>
              {" "}
              <strong>{review.user.userName}</strong>
            </label>
          </div>
          <br />
          <div classname={styles.descriptiondiv}>
            <p className={styles.reviewDesc}>{review.description}</p>
            <p className={styles.reviewDesc}>
              <strong>Rating : </strong>
              {review.rating} / 5
            </p>
          </div>
        </div>
      );
    });
  }

  const hotelPolicies = [
    "It is mandatory for guests to present valid photo identification at the time of check-in.",
    "In case of bookings where payment is charged directly at the resort, we need your Credit Card details to guarantee the booking. The booking confirmation is subject to successful validation of your Credit Card by the resort. Goibibo will not charge your card however, the resort reserves the right to charge a part or full amount before the check-in.",
    "The primary guest checking in to the resort must be at least 18 years of age. If your child requires additional bedding and/or breakfast options, please book them as an adult to ensure the correct room configuration. You will be notified of any additional costs resulting from individual resort policies regarding children staying with parents and age range allowed.",
    "The standard check-in time is 2 PM and the standard check-out time is 12 PM. After booking you will be sent an email confirmation with resort phone number. You can contact the resort directly for early check-in or late check-out. Early check-in or late check-out is subject to availability and may be chargeable by The Tubkaak Krabi Boutique Resort.",
    "The room tariff includes all taxes. The amount paid for the room does not include charges for optional services and facilities (such as room service, mini bar, snacks or telephone calls). These will be charged by the resort at the time of check-out from the resort.",
    "Selective offers of Goibibo will not be valid on cancellation or modification of a booking.",
    "Number of modifications possible on a booking will be on the discretion of Goibibo.",
  ];

  return (
    <div className={styles.singleHotelViewMainDiv}>
      <div className={styles.singleHotelViewMainInnerDiv}>
        <div className={styles.singleHotelViewLeftAlignedDiv}>
          <Carousel fade>
            {hotelImages.map((image) => {
              return (
                <Carousel.Item>
                  <img
                    className={styles.carouselImageStyling}
                    src={image}
                    alt=""
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
                style={{
                  border: "0px",
                  marginTop: "20px",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  width: "100%",
                }}
                cardTitle={[
                  {
                    heading: "Name",
                    para: hotel.name,
                  },
                  {
                    heading: "Locate On Map",
                    para: hotel.location,
                    icon: <i class="fas fa-monument"></i>,
                  },
                  {
                    heading: "Landmark",
                    para: hotel.landmark,
                    icon: <i class="fas fa-map-marked-alt"></i>,
                  },
                  {
                    heading: "Type",
                    para: hotel.type,
                    icon: <i class="fas fa-hotel"></i>,
                  },
                ]}
              />
            </div>
            <div className={styles.rightAlignedDiv}>
              <CardComponent
                style={{
                  border: "0px",
                  marginTop: "20px",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  width: "100%",
                }}
                cardTitle={[
                  {
                    heading: "",
                    para: "",
                    type: "button",
                    content: (
                      <div className={styles.specialDivStyling}>
                        <strong style={{ fontFamily: "Poppins" }}>
                          <i class="fas fa-utensils"></i> Free Breakfast
                        </strong>
                      </div>
                    ),
                  },
                  {
                    heading: "",
                    para: "",
                    type: "button",
                    content: (
                      <div className={styles.specialDivStyling}>
                        <strong style={{ fontFamily: "Poppins" }}>
                          <i class="fas fa-wifi"></i> Internet/Wifi
                        </strong>
                      </div>
                    ),
                  },
                  { heading: "Hotel Pricing and Rooms", para: "" },
                  {
                    heading: "",
                    para: "",
                    type: "button",
                    content: (
                      <div className={styles.specialDivStyling}>
                        <p>Pricing Starts At</p>
                        <p>
                          Original Price:{" "}
                          <strong>
                            <s>
                              <i class="fas fa-rupee-sign"></i>
                              {hotel.discountPrice}
                            </s>
                          </strong>
                        </p>
                        <p>
                          Discount Price:{" "}
                          <strong>
                            <i class="fas fa-rupee-sign"></i>
                            {hotel.startPrice}
                          </strong>
                        </p>
                      </div>
                    ),
                  },
                  {
                    heading: "",
                    para: "",
                    type: "button",
                    content: (
                      <div className={styles.roomOptionsOuterDiv}>
                        <Button className={styles.roomsOptionButton}>
                          <Link to="roomSection" spy={true} smooth={true}>
                            <strong>
                              {roomsAvailable.length >= 1 ? (
                                <div>
                                  <p>View {roomsCount} Room Options </p>
                                  <i class="fas fa-angle-down"></i>
                                </div>
                              ) : (
                                <p> Sold Out</p>
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

      <br />
      <div className={styles.commonButtonType}>
        {roomsAvailable.length >= 1 ? (
          <div>
            <div id="roomSection">
              <label className={styles.roomOptionsLabel}>
                <strong>Room Options</strong>
              </label>
            </div>
            {roomComponent}
          </div>
        ) : null}
      </div>
      <br />
      <div className={styles.commonButtonType}>
        <div>
          <label className={styles.commonLabelStyling}>
            <strong>Guest Reviews and Rating</strong>
          </label>
          {reviewComponent}
        </div>
      </div>

      <br />
      <div className={styles.commonButtonType}>
        <div>
          <label className={styles.commonLabelStyling}>
            <strong>Hotel Policies</strong>
          </label>
        </div>
        <div className={styles.policyOuterDiv}>
          {hotelPolicies.map((policy) => {
            return (
              <div classname={styles.policyinnerdiv}>
                <p>
                  <i class="fa fa-check-circle" aria-hidden="true"></i> {policy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleHotelView;
