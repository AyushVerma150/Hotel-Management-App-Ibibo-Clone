import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button } from "react-bootstrap";

// import { Card } from "react-bootstrap";
import { createBooking } from "Components/Hotel/HotelSlice";
import CardComponent from "UI/CardComponent";

import styles from "Components/Checkout/Checkout.module.css";
import otherConstants from "Constants/OtherConstants";
import OtherConstants from "Constants/OtherConstants";

const Checkout = () => {
  const dispatch = useDispatch();
  const bookingStatus = useSelector((state) => state.hotel.bookingStatus);
  const selectedHotels = useSelector((state) => state.hotel.hotelSelected);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [content, setContent] = useState(null);

  const startDate = moment(
    selectedHotels[0].checkIn,
    otherConstants.dateTimeFormat
  );
  const endDate = moment(
    selectedHotels[0].checkOut,
    otherConstants.dateTimeFormat
  );
  const days = endDate.diff(startDate, otherConstants.daysDifference);
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
      modeOfPayment: otherConstants.onlineModeOfPayment,
      hotelId: selectedHotels[0].id,
      userId: currentUser.id,
    };
    dispatch(createBooking(bookingsData));
  };

  useEffect(() => {
    if (bookingStatus === otherConstants.successStatus) {
      setContent(
        <div className={styles.successDiv}>
          <strong>Booking Made Successfully</strong>
        </div>
      );
    } else if (bookingStatus === otherConstants.failedStatus) {
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
                className={styles.cardComponentStyles}
                image={OtherConstants.checkoutImage}
                imageStyle={styles.checkOutImageStyle}
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
                    type: otherConstants.cardComponentType,
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
                    heading: otherConstants.RoomType,
                    para: hotel.type + otherConstants.crossSymbol + hotel.rooms,
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
                type: otherConstants.cardComponentType,
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>
                        Room Charges (
                        {rooms + " rooms x " + nightsSpent + " nights"})
                      </strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>
                        {otherConstants.indianRuppee +
                          roomCharges * nightsSpent}
                      </strong>
                    </div>
                  </div>
                ),
              },
              {
                type: otherConstants.cardComponentType,
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>Discount</strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>{otherConstants.indianRuppee + discount}</strong>
                    </div>
                  </div>
                ),
              },
              {
                type: otherConstants.cardComponentType,
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
                type: otherConstants.cardComponentType,
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>Pay Now</strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>
                        {otherConstants.indianRuppee +
                          (roomCharges * nightsSpent - discount + tax)}
                      </strong>
                    </div>
                  </div>
                ),
              },
              {
                type: otherConstants.cardComponentType,
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
