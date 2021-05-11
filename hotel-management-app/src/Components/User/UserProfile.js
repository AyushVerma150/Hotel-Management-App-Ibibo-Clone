import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CardComponent from "UI/CardComponent";
import Button from "UI/Button";
import EditUserProfile from "./EditUserProfile";

import otherConstants from "Constants/OtherConstants";
import styles from "Components/User/User.module.css";
const UserProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [component, setComponent] = useState(null);

  useEffect(() => {}, []);

  let reviewComponent = null;
  let bookingsComponent = null;
  const currentUserReviews = useSelector(
    (state) => state.user.currentUserReviews
  );

  const bookingsMadeByUser = useSelector((state) => state.hotel.bookingsMade);

  if (bookingsMadeByUser) {
    bookingsComponent = (
      <CardComponent
        cardTitle={[
          { heading: otherConstants.bookingsId, para: bookingsMadeByUser.id },
          {
            heading: otherConstants.primaryGuest,
            para: bookingsMadeByUser.primaryGuest,
          },
          {
            heading: otherConstants.roomsBooked,
            para: bookingsMadeByUser.roomsBooked,
          },
          {
            heading: otherConstants.totalAmount,
            para: bookingsMadeByUser.amount,
          },
          {
            heading: otherConstants.checkInText,
            para: bookingsMadeByUser.checkIn,
          },
          {
            heading: otherConstants.checkOutText,
            para: bookingsMadeByUser.checkOut,
          },
        ]}
      />
    );
  }

  if (currentUserReviews) {
    reviewComponent = currentUserReviews.map((review) => {
      return (
        <div className={styles.userReviewOuterDiv}>
          <div className={styles.innerDiv}>
            <img
              src={review.user.userImage}
              alt={otherConstants.imageAlt}
              className={styles.reviewImage}
            />
            <label className={styles.labelReview}>
              <strong>{review.user.userName}</strong>
            </label>
          </div>
          <br />
          <div className={styles.descriptionStyles}>
            <p>{review.description}</p>
            <p>
              <strong>Rating : </strong>
              {review.rating} / {otherConstants.overAllRating}
            </p>
          </div>
        </div>
      );
    });
  } else {
    reviewComponent = <p>No Reviews were made by you</p>;
  }

  const handleEditProfile = () => {
    setComponent(<EditUserProfile currentUser={currentUser} />);
  };

  const handleBookingsClick = () => {
    setComponent(bookingsComponent);
  };

  const handleUserReviews = () => {
    setComponent(
      <div>
        <label className={styles.outerDiv}>
          <strong>{otherConstants.reviewAndRatings}</strong>
        </label>
        {reviewComponent}
      </div>
    );
  };

  return (
    <div className={styles.userProfileDiv}>
      {currentUser ? (
        <div className={styles.profileArea}>
          <div className={styles.profileContent}>
            <div className={styles.leftHalf}>
              <img
                className={styles.profileImage}
                src={currentUser.userImage}
                alt={otherConstants.imageAlt}
              />
            </div>
            <div className={styles.rightHalf}>
              <div className={styles.labelDiv}>
                <label className={styles.labelStyle}>
                  {currentUser.userName}
                </label>
                <br />

                <label className={styles.labelStyle}>{currentUser.email}</label>
              </div>
              <div className={styles.displayFlex}>
                <div className={styles.displayBlock}>
                  <label className={styles.labelStyle}>
                    {currentUserReviews.length}
                  </label>
                  <br />
                  <label className={styles.labelStyle}>Reviews</label>
                </div>
                <div className={styles.displayBlock}>
                  <label className={styles.labelStyle}>0</label>
                  <br />
                  <label className={styles.labelStyle}>Trips</label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.userInfoDiv}>
            <div className={styles.userInfoInnerDiv}>
              <Button
                class={styles.HeadingButtons}
                clicked={() => {
                  handleBookingsClick();
                }}
              >
                {otherConstants.userBookings}
              </Button>
              <Button
                clicked={() => {
                  handleUserReviews();
                }}
                class={styles.HeadingButtons}
              >
                {otherConstants.userReviews}
              </Button>
              <Button
                clicked={() => {
                  handleEditProfile();
                }}
                class={styles.HeadingButtons}
              >
                {otherConstants.editButton}
              </Button>
            </div>
            <div className={styles.extremeLeft}>
              <label className={styles.labelLogin}>
                {otherConstants.userInformation}
              </label>
            </div>
            <hr className={styles.highlight} />
            {component}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
