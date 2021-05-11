import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "UI/Button";
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
        class={styles.searchDisplayUpdateSearch}
        clicked={() => {
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
            <lable>{otherConstants.displayAdults}</lable>
            <br />
            <Button>{otherConstants.subtractIcon}</Button>
            <Button>{filterResults.adults}</Button>
            <Button
              clicked={() => {
                dispatch(updateAdults());
              }}
            >
              {otherConstants.addIcon}
            </Button>
          </div>
          <div className={styles.guestDiv}>
            <lable>{otherConstants.displayRooms}</lable>
            <br />
            <Button>{otherConstants.subtractIcon}</Button>
            <Button>{filterResults.rooms}</Button>
            <Button
              clicked={() => {
                if (filterSearch.rooms < 8) {
                  dispatch(updateRooms());
                }
              }}
            >
              {otherConstants.addIcon}
            </Button>
          </div>
          <Button
            class={styles.doneButton}
            clicked={() => {
              setShowDiv(otherConstants.none);
            }}
          >
            {otherConstants.displayDone}
          </Button>
        </div>
      </span>
    </div>
  );
};

export default SearchDisplay;
