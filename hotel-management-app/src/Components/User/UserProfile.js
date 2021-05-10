import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "Components/User/User.module.css";
import CardComponent from "UI/CardComponent";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import EditUserProfile from "./EditUserProfile";

const UserProfile = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [component, setComponent] = useState(null);

  useEffect(() => {}, []);

  let userComponent = null;
  let reviewComponent = null;
  let bookingsComponent = null;
  const currentUserReviews = useSelector(
    (state) => state.user.currentUserReviews
  );

  const bookingsMadeByUser = useSelector((state) => state.hotel.bookingsMade);

  if (bookingsMadeByUser) {
    bookingsComponent = (
      // bookingsMadeByUser.map((booking) => {
      //   return (
      <CardComponent
        cardTitle={[
          { heading: "Booking Id", para: bookingsMadeByUser.id },
          { heading: "Primary Guest", para: bookingsMadeByUser.primaryGuest },
          { heading: "Rooms Booked", para: bookingsMadeByUser.roomsBooked },
          { heading: "Total Amount", para: bookingsMadeByUser.amount },
          { heading: "Check In", para: bookingsMadeByUser.checkIn },
          { heading: "Check Out", para: bookingsMadeByUser.checkOut },
        ]}
      />
    );
    //   );
    // });
  }

  if (currentUserReviews) {
    reviewComponent = currentUserReviews.map((review) => {
      return (
        <div
          style={{ width: "100%", border: "1px solid black", marginTop: "2px" }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px",
            }}
          >
            <img
              src={review.user.userImage}
              alt="BigCo Inc. logo"
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "10px",
              }}
            />
            <label
              style={{
                height: "20px",
                marginLeft: "10px",
              }}
            >
              {" "}
              <strong>{review.user.userName}</strong>
            </label>
          </div>
          <br />
          <div
            style={{
              display: "block",
              padding: "5px",
            }}
          >
            <p style={{ textAlign: "left" }}>{review.description}</p>
            <p style={{ textAlign: "left" }}>
              <strong>Rating : </strong>
              {review.rating} / 5
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
        <label
          style={{
            fontSize: "1.5rem",
            marginTop: "20px",
            fontFamily: "Poppins",
          }}
        >
          <strong>Reviews and Ratings</strong>
        </label>
        {reviewComponent}
      </div>
    );
  };

  //   if (currentUser) {
  //     userComponent = <h4>{"Hello , " + currentUser.name}</h4>;
  //   } else {
  //     userComponent = <h4>Please Login / Sign up to continue</h4>;
  //   }

  return (
    <div className={styles.userProfileDiv}>
      {currentUser ? (
        <div className={styles.profileArea}>
          <div className={styles.profileContent}>
            <div className={styles.leftHalf}>
              <img
                className={styles.profileImage}
                src={currentUser.userImage}
                alt="alternative text"
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
            <div
              style={{
                display: "flex",
                marginLeft: "100px",
                marginTop: "20px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "rgb(255, 109, 56)",
                  border: "none",
                  outline: "none",
                  height: "60px",
                  width: "20%",
                  marginLeft: "10px",
                  borderRadius: "4px",
                }}
                onClick={() => {
                  handleBookingsClick();
                }}
              >
                Bookings
              </Button>
              <Button
                onClick={() => {
                  handleUserReviews();
                }}
                style={{
                  backgroundColor: "rgb(255, 109, 56)",
                  border: "none",
                  outline: "none",
                  height: "60px",
                  width: "20%",
                  marginLeft: "10px",
                  borderRadius: "4px",
                }}
              >
                Reviews
              </Button>
              <Button
                onClick={() => {
                  handleEditProfile();
                }}
                style={{
                  backgroundColor: "rgb(255, 109, 56)",
                  border: "none",
                  outline: "none",
                  height: "60px",
                  width: "20%",
                  marginLeft: "10px",
                  borderRadius: "4px",
                }}
              >
                Edit Profile
              </Button>
            </div>
            <div style={{ marginLeft: "-550px" }}>
              <label className={styles.labelLogin}>User Information</label>
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
