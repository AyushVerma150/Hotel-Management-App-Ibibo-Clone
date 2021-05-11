import React from "react";
import { useSelector } from "react-redux";

import otherConstants from "Constants/OtherConstants";

import styles from "Components/Hotel/Hotel.module.css";

const HotelReview = () => {
  const currentHotelReviews = useSelector(
    (state) => state.hotel.currentHotelReviews
  );
  return (
    <div>
      {currentHotelReviews.map((review) => {
        return (
          <div className={styles.hotelReviewOuterDiv}>
            <div classname={styles.hotelreviewinnerdiv}>
              <img
                src={review.user.userImage}
                alt={otherConstants.imageAlt}
                className={styles.reviewImageStyle}
              />
              <label className={styles.imageLabel}>
                <strong>{review.user.userName}</strong>
              </label>
            </div>
            <br />
            <div classname={styles.descriptiondiv}>
              <p className={styles.reviewDesc}>{review.description}</p>
              <p className={styles.reviewDesc}>
                <strong>Rating : </strong>
                {review.rating} / {otherConstants.overAllRating}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelReview;
