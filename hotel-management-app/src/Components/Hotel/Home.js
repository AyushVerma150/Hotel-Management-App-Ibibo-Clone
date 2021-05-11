import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";

import {
  setFilterSearchSlice,
  setChildrenReducer,
  updateSearchText,
} from "Components/Hotel/HotelSlice";
import { fetchAllHotels, setStayDates } from "Components/Hotel/HotelSlice";
import CardComponent from "UI/CardComponent";
import MultiSearchComponent from "Components/Search/MultiSearchComponent";

import otherConstants from "Constants/OtherConstants";
import styles from "Components/Hotel/Hotel.module.css";

const Home = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  let today = moment().format(otherConstants.dateTimeFormat);
  let tomorrow = moment()
    .add(1, otherConstants.daysDifference)
    .format(otherConstants.dateTimeFormat)
    .toString();

  const checkInDate = today;
  const checkOutDate = tomorrow;

  const children = [];
  const [filterSearch, setFilterSearch] = useState({
    searchText: otherConstants.emptyText,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    adults: otherConstants.defaultAdults,
    rooms: otherConstants.defaultRooms,
    children: otherConstants.defaultChildren,
  });

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  const HandleDestinationClick = (value) => {
    dispatch(setFilterSearchSlice(filterSearch));
    dispatch(setStayDates({ start: today, end: tomorrow }));
    dispatch(setChildrenReducer(children));
    dispatch(updateSearchText({ text: value }));
    history.push(`/findHotels/${value}`);
  };
  const destinations = useSelector((state) => state.hotel.destinations);

  const handleDestinationClick = (destinationName) => {
    setFilterSearch((prevFilter) => ({
      ...prevFilter,
      searchText: destinationName,
    }));
    HandleDestinationClick(destinationName);
  };

  return (
    // This is the Home Page
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv}>
        <div className={styles.displayBlock}>
          {/* This is Multi Search Component at The Very First Page */}
          <MultiSearchComponent />
        </div>
      </div>
      <br />
      <div className={styles.destinationsDiv}>
        <p className={styles.heading}>Popular Destinations</p>
        <hr className={styles.colorblack} />
      </div>

      <div className={styles.HotelDiv}>
        {/* All the Destinations Card are Displayed Here */}
        {destinations.map((destination) => {
          return (
            <CardComponent
              image={destination.image}
              class={styles.HotelCard}
              imageStyle={styles.image}
              clicked={() => {
                handleDestinationClick(destination.name);
              }}
              cardTitle={[{ heading: destination.name }]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
