import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Button from "UI/Button";
import { createBooking } from "Components/Hotel/HotelSlice";
import CardComponent from "UI/CardComponent";

import styles from "Components/Checkout/Checkout.module.css";
import otherConstants from "Constants/OtherConstants";

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

  const handleCreateBooking = () => {
    //createing a data object for bookings
    const bookingsData = {
      amount: roomCharges * days - discount + otherConstants.taxValue,
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

  //checking the bookings status
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
      {/* The Whole Div is divided into two Halves with information about Hotel Selected And Price Summary */}
      <div className={styles.checkoutOuterDiv}>{content}</div>
      <div className={styles.checkoutInnerDiv}>
        <div className={styles.checkoutCardDiv}>
          {selectedHotels.map((hotel) => {
            return (
              <CardComponent
                className={styles.cardComponentStyles}
                image={otherConstants.checkoutImage}
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
                          <strong>{otherConstants.checkInText}</strong>
                          <p>{hotel.checkIn}</p>
                        </div>
                        <div className={styles.rightDiv}>
                          <strong>{otherConstants.checkOutText}</strong>
                          <p>{hotel.checkOut}</p>
                        </div>
                        <div className={styles.rightDiv}>
                          <strong>{otherConstants.guestInfo}</strong>
                          <p>
                            {hotel.adults +
                              hotel.children +
                              otherConstants.guestInfoText +
                              hotel.rooms +
                              otherConstants.roomsText}
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
            className={styles.cardInnerStyles}
            cardTitle={[
              {
                type: otherConstants.cardComponentType,
                content: (
                  <div className={styles.contentOuterDiv}>
                    <div className={styles.contentInnerLeftDiv}>
                      <strong>
                        {otherConstants.roomCharges +
                          rooms +
                          otherConstants.roomInfo +
                          otherConstants.crossSymbol +
                          nightsSpent +
                          otherConstants.nightsText}
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
                      <strong>{otherConstants.discount}</strong>
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
                      <strong>{otherConstants.taxesAndFees}</strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>
                        {otherConstants.indianRuppee + otherConstants.taxValue}
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
                      <strong>{otherConstants.payNow}</strong>
                    </div>
                    <div className={styles.contentInnerRightDiv}>
                      <strong>
                        {otherConstants.indianRuppee +
                          (roomCharges * nightsSpent -
                            discount +
                            otherConstants.taxValue)}
                      </strong>
                    </div>
                  </div>
                ),
              },
              {
                type: otherConstants.cardComponentType,
                content: (
                  <Button
                    clicked={() => {
                      handleCreateBooking();
                    }}
                    class={styles.createBookingButton}
                  >
                    {otherConstants.createBooking}
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
