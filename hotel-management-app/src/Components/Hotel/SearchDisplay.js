import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import TextFieldComponent from "UI/TextFieldComponent";
import { setFilterSearchSlice } from "Components/Hotel/HotelSlice";
import { updateAdults, updateRooms } from "Components/Hotel/HotelSlice";

import styles from "Components/Hotel/Hotel.module.css";

const SearchDisplay = () => {
  const dispatch = useDispatch();

  const filterResults = useSelector((state) => state.hotel.filteredSearch);
  const [filterSearch, setFilterSearch] = useState(filterResults);

  const [children, setChildren] = useState(
    useSelector((state) => state.hotel.children)
  );

  const [showDiv, setShowDiv] = useState("none");

  const handleChange = (e) => {
    setFilterSearch((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.blockDisplay}>
        <label htmlFor="searchText">Area , Location or Landmark</label>
        <TextFieldComponent
          id="searchText"
          changed={(e) => {
            handleChange(e);
          }}
          name="searchText"
          defaultValue={filterSearch.searchText}
        />
      </div>
      <div className={styles.checkInDiv}>
        <label htmlFor="checkIn">Check In</label>
        <br />
        <TextFieldComponent
          changed={(e) => {
            handleChange(e);
          }}
          name="checkIn"
          id="date"
          type="date"
          defaultValue={filterSearch.checkIn}
          inputProps={{
            min: filterSearch.checkIn,
            max: filterSearch.checkOut,
          }}
          variant="standard"
        />
      </div>
      <div className={styles.checkOutDiv}>
        <label htmlFor="checkOut">Check Out</label>
        <br />
        <TextFieldComponent
          name="checkOut"
          changed={(e) => {
            handleChange(e);
          }}
          disablePast
          id="date"
          type="date"
          defaultValue={filterSearch.checkOut}
          inputProps={{
            min: filterSearch.checkOut,
          }}
        />
      </div>
      <div className={styles.blockDisplay}>
        <label htmlFor="guests">Guests Information</label>
        <TextFieldComponent
          clicked={() => {
            setShowDiv("block");
          }}
          name="guests"
          value={
            filterResults.adults +
            filterResults.children +
            " Guests In " +
            filterResults.rooms +
            " Rooms"
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
            showDiv === "none"
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
              setShowDiv("none");
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
