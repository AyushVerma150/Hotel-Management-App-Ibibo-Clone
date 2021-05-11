import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "UI/Button";
import EditUserProfile from "./EditUserProfile";
import { fetchAllBookings, fetchAllReviews } from "Components/User/UserSlice";
import UserBookings from "Components/User/userBookings";
import UserReview from "Components/User/UserReview";

import otherConstants from "Constants/OtherConstants";
import styles from "Components/User/User.module.css";

const UserProfile = () => {
  const dispatch = useDispatch();

  const initialComponent = <div>{otherConstants.initialText}</div>;
  const [bookingsComponent, setBookingsComponent] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedHotels = useSelector((state) => state.user.userBookings);
  const status = useSelector((state) => state.user.status);
  const bookingsMade = useSelector((state) => state.hotel.bookingsMade);

  useEffect(() => {
    dispatch(fetchAllBookings({ userId: currentUser.id }));
    dispatch(fetchAllReviews({ userId: currentUser.id }));
  }, [dispatch, currentUser.id, bookingsMade]);

  useEffect(() => {
    if (status === otherConstants.successStatus) {
      if (selectedHotels) {
        setBookingsComponent(<UserBookings selectedHotels={selectedHotels} />);
      } else {
        setBookingsComponent(otherConstants.noBookingsText);
      }
    } else {
      setBookingsComponent(otherConstants.noBookingsText);
    }
  }, [selectedHotels, status]);

  let reviewComponent = null;
  const currentUserReviews = useSelector(
    (state) => state.user.currentUserReviews
  );

  const [component, setComponent] = useState(initialComponent);

  if (currentUserReviews.length >= 1) {
    reviewComponent = <UserReview currentUserReviews={currentUserReviews} />;
  } else {
    reviewComponent = <p>{otherConstants.noReviewsText}</p>;
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

  const totalTrips = selectedHotels.length;
  const totalReviews = currentUserReviews.length;

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
                  <label className={styles.labelStyle}>{totalReviews}</label>
                  <br />
                  <label className={styles.labelStyle}>
                    {otherConstants.totalReviews}
                  </label>
                </div>
                <div className={styles.displayBlock}>
                  <label className={styles.labelStyle}>{totalTrips}</label>
                  <br />
                  <label className={styles.labelStyle}>
                    {otherConstants.totalTrips}
                  </label>
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
