import React, { useEffect } from "react";

import styles from "Components/Hotel/Hotel.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHotelWithRooms,
  fetchHotelReviews,
} from "Components/Hotel/HotelSlice";
import HotelRoom from "Components/Hotel/HotelRoom";
import HotelReview from "Components/Hotel/HotelReview";
import HotelPolicy from "Components/Hotel/HotelPolicy";

import otherConstants from "Constants/OtherConstants";
import HotelDetail from "./HotelDetails";

const SingleHotelView = ({ match }) => {
  const { hotelName } = match.params;
  const hotelPolicies = otherConstants.hotelPolicies;
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
  let hotelPolicyComponent = null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotelWithRooms({ hotelId: hotel.id }));
    dispatch(fetchHotelReviews({ hotelId: hotel.id }));
  }, [dispatch, hotel.id]);

  let roomsAvailable = [];
  if (hotelWithRoom.rooms) {
    roomsAvailable = hotelWithRoom.rooms.filter((room) => {
      if (room.capacity >= minGuestsInRoom) return true;
      else return false;
    });
  }

  if (roomsAvailable.length >= 1) {
    roomComponent = <HotelRoom />;
  } else {
    roomComponent = otherConstants.roomsNotAvailable;
  }

  if (currentHotelReviews) {
    reviewComponent = <HotelReview />;
  }

  if (hotelPolicies.length >= 1) {
    hotelPolicyComponent = <HotelPolicy />;
  }

  return (
    <div className={styles.singleHotelViewMainDiv}>
      <HotelDetail hotelName={hotelName} />
      <br />
      <div className={styles.commonButtonType}>
        {roomsAvailable.length >= 1 ? (
          <div>
            <div id={otherConstants.roomsSection}>
              <label className={styles.roomOptionsLabel}>
                <strong>{otherConstants.roomOptions}</strong>
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
            <strong>{otherConstants.reviewsHeading}</strong>
          </label>
          {reviewComponent}
        </div>
      </div>
      <br />
      <div className={styles.commonButtonType}>
        <div>
          <label className={styles.commonLabelStyling}>
            <strong>{otherConstants.hotelPolicyHeading}</strong>
          </label>
        </div>
        <div className={styles.policyOuterDiv}>{hotelPolicyComponent}</div>
      </div>
    </div>
  );
};

export default SingleHotelView;
