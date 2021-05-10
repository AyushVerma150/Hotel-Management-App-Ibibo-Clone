import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { createBooking } from "Components/Hotel/HotelSlice";
import moment from "moment";
import { Button } from "react-bootstrap";
import CardComponent from "UI/CardComponent";
import styles from "Components/Checkout/Checkout.module.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const bookingStatus = useSelector((state) => state.hotel.bookingStatus);
  const selectedHotels = useSelector((state) => state.hotel.hotelSelected);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [content, setContent] = useState(null);

  const startDate = moment(selectedHotels[0].checkIn, "YYYY-MM-DD");
  const endDate = moment(selectedHotels[0].checkOut, "YYYY-MM-DD");
  const days = endDate.diff(startDate, "days");
  const roomCharges = selectedHotels[0].discountPrice;
  const rooms = selectedHotels[0].rooms;
  const nightsSpent = days;
  const discount = selectedHotels[0].price - selectedHotels[0].discountPrice;
  const tax = 498;

  const handleCreateBooking = () => {
    const bookingsData = {
      amount: roomCharges * days - discount + tax,
      roomsBooked: rooms,
      adults: selectedHotels[0].adults,
      children: selectedHotels[0].children,
      checkIn: selectedHotels[0].checkIn,
      checkOut: selectedHotels[0].checkOut,
      primaryGuest: currentUser.userName,
      modeOfPayment: "online",
      hotelId: selectedHotels[0].id,
      userId: currentUser.id,
    };
    dispatch(createBooking(bookingsData));
  };

  useEffect(() => {
    if (bookingStatus === "success") {
      setContent(
        <div className={styles.successDiv}>
          <strong>Booking Made Successfully</strong>
        </div>
      );
    } else if (bookingStatus === "failed") {
      setContent(
        <div className={styles.errorDiv}>
          <strong>Booking Failed</strong>
        </div>
      );
    }
  }, [bookingStatus]);

  return (
    <div>
      <div className={styles.checkoutOuterDiv}>{content}</div>
      <div className={styles.checkoutInnerDiv}>
        <div className={styles.checkoutCardDiv}>
          {selectedHotels.map((hotel) => {
            return (
              <CardComponent
                style={{
                  border: "none",
                  color: "black",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                image="https://cdn1.goibibo.com/voy_ing/t_g/81ad700a81ee11e486f9daf4768ad8d9.jfif"
                imageStyle={{ height: "200px", width: "30%" }}
                cardTitle={[
                  {
                    heading: "Name",
                    para: hotel.name,
                  },
                  {
                    heading: "Locate on Map",
                    para: hotel.location,
                    icon: <i class="fas fa-map-marked-alt"></i>,
                  },
                  {
                    heading: "",
                    para: "",
                    type: "button",
                    content: (
                      <div className={styles.checkoutDivContent}>
                        <div className={styles.leftDiv}>
                          <strong>Check In</strong>
                          <p>{hotel.checkIn}</p>
                        </div>
                        <div className={styles.rightDiv}>
                          <strong>Check Out</strong>
                          <p>{hotel.checkOut}</p>
                        </div>
                        <div className={styles.rightDiv}>
                          <strong>Guests</strong>
                          <p>
                            {hotel.adults +
                              hotel.children +
                              " Guests  | " +
                              hotel.rooms +
                              " Room"}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    heading: "Room Selected",
                    para: hotel.type + "  x" + hotel.rooms,
                  },
                ]}
              />
            );
          })}
        </div>
        <div className={styles.priceSummaryDiv}>
          <CardComponent
            style={{
              fontFamily: "Poppins",
              fontSize: "1.2rem",
              padding: "5px",
            }}
            cardTitle={[
              {
                type: "button",
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>
                        Room Charges (
                        {rooms + " rooms x " + nightsSpent + " nights"})
                      </strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>{"Rs. " + roomCharges * nightsSpent}</strong>
                    </div>
                  </div>
                ),
              },
              {
                type: "button",
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>Discount</strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>{"Rs. " + discount}</strong>
                    </div>
                  </div>
                ),
              },
              {
                type: "button",
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>Taxes and Fees</strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>Rs. 498</strong>
                    </div>
                  </div>
                ),
              },
              {
                type: "button",
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>Pay Now</strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>
                        {"Rs. " + (roomCharges * nightsSpent - discount + tax)}
                      </strong>
                    </div>
                  </div>
                ),
              },
              {
                type: "button",
                content: (
                  <Button
                    onClick={() => {
                      handleCreateBooking();
                    }}
                    className={styles.createBookingButton}
                  >
                    Create Booking
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
