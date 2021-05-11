import React from "react";

import CardComponent from "UI/CardComponent";

import otherConstants from "Constants/OtherConstants";
import checkOutStyles from "Components/Checkout/Checkout.module.css";
import styles from "Components/User/User.module.css";

const userBookings = (props) => {
  return (
    <div>
      <div className={styles.bookingsDiv}>
        {props.selectedHotels.map((hotel) => {
          return (
            <CardComponent
              className={checkOutStyles.cardComponentStyles}
              cardTitle={[
                {
                  heading: otherConstants.bookingUser,
                  para: hotel.primaryGuest,
                },
                {
                  type: otherConstants.cardComponentType,
                  content: (
                    <div className={checkOutStyles.checkoutDivContent}>
                      <div className={checkOutStyles.leftDiv}>
                        <strong>{otherConstants.checkInText}</strong>
                        <p>{hotel.checkIn}</p>
                      </div>
                      <div className={checkOutStyles.rightDiv}>
                        <strong>{otherConstants.checkOutText}</strong>
                        <p>{hotel.checkOut}</p>
                      </div>
                      <div className={checkOutStyles.rightDiv}>
                        <strong>{otherConstants.guestInfo}</strong>
                        <p>
                          {Number(hotel.adults) + Number(hotel.children)}
                          {otherConstants.guestInfoText}
                          {hotel.roomsBooked}
                          {otherConstants.roomsText}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  heading: otherConstants.totalAmountPaid,
                  para: hotel.amount,
                  icon: otherConstants.ruppeeIcon,
                },
              ]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default userBookings;
