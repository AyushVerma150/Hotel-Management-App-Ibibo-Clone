import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import TextFieldComponent from "UI/TextFieldComponent";
import { setFilterSearchSlice } from "Components/Hotel/HotelSlice";
import { updateAdults, updateRooms } from "Components/Hotel/HotelSlice";

import styles from "Components/Hotel/Hotel.module.css";
import otherConstants from "Constants/OtherConstants";

const SearchDisplay = () => {
  const dispatch = useDispatch();

  const filterResults = useSelector((state) => state.hotel.filteredSearch);
  const [filterSearch, setFilterSearch] = useState(filterResults);
  const [showDiv, setShowDiv] = useState(otherConstants.none);

  const handleChange = (e) => {
    setFilterSearch((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.blockDisplay}>
        <label htmlFor={otherConstants.searchText}>
          {otherConstants.searchPlaceholder}
        </label>
        <TextFieldComponent
          id={otherConstants.searchText}
          changed={(e) => {
            handleChange(e);
          }}
          name={otherConstants.searchText}
          defaultValue={filterSearch.searchText}
        />
      </div>
      <div className={styles.checkInDiv}>
        <label htmlFor={otherConstants.checkIn}>Check In</label>
        <br />
        <TextFieldComponent
          changed={(e) => {
            handleChange(e);
          }}
          name={otherConstants.checkIn}
          id={otherConstants.dateType}
          type={otherConstants.dateType}
          defaultValue={filterSearch.checkIn}
          inputProps={{
            min: filterSearch.checkIn,
            max: filterSearch.checkOut,
          }}
          variant={otherConstants.standardVariant}
        />
      </div>
      <div className={styles.checkOutDiv}>
        <label htmlFor={otherConstants.checkOut}>Check Out</label>
        <br />
        <TextFieldComponent
          name={otherConstants.checkOut}
          changed={(e) => {
            handleChange(e);
          }}
          disablePast
          id={otherConstants.dateType}
          type={otherConstants.dateType}
          defaultValue={filterSearch.checkOut}
          inputProps={{
            min: filterSearch.checkOut,
          }}
        />
      </div>
      <div className={styles.blockDisplay}>
        <label htmlFor={otherConstants.guests}>Guests Information</label>
        <TextFieldComponent
          clicked={() => {
            setShowDiv(otherConstants.block);
          }}
          name={otherConstants.guests}
          value={
            filterResults.adults +
            filterResults.children +
            otherConstants.guestText +
            filterResults.rooms +
            otherConstants.roomsText
          }
        />
      </div>
      <Button
        className={styles.searchDisplayUpdateSearch}
        onClick={() => {
          dispatch(setFilterSearchSlice(filterSearch));
        }}
      >
        Update Search
      </Button>

      <span>
        <div
          className={
            showDiv === otherConstants.none
              ? styles.searchDisplayStylingHide
              : styles.searchDisplayStylingShow
          }
        >
          <strong className={styles.textStyle}>Update Guests</strong>
          <div className={styles.guestDiv}>
            <lable>Adults</lable>
            <br />
            <Button>-</Button>
            <Button>{filterResults.adults}</Button>
            <Button
              onClick={() => {
                dispatch(updateAdults());
              }}
            >
              +
            </Button>
          </div>
          <div className={styles.guestDiv}>
            <lable>Rooms</lable>
            <br />
            <Button>-</Button>
            <Button>{filterResults.rooms}</Button>
            <Button
              onClick={() => {
                if (filterSearch.rooms < 8) {
                  dispatch(updateRooms());
                }
              }}
            >
              +
            </Button>
          </div>
          <Button
            className={styles.doneButton}
            onClick={() => {
              setShowDiv(otherConstants.none);
            }}
          >
            Done
          </Button>
        </div>
      </span>
    </div>
  );
};

export default SearchDisplay;
