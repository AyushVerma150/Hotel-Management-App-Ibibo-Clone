import React from "react";

import otherConstants from "Constants/OtherConstants";
import styles from "Components/User/User.module.css";

const UserReview = (props) => {
  return (
    <div className={styles.bookingsDiv}>
      {props.currentUserReviews.map((review) => {
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
      })}
    </div>
  );
};

export default UserReview;
