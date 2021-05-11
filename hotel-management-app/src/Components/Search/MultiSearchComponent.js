import React, { useState } from "react";
import otherConstants from "Constants/OtherConstants";
import nextId from "react-id-generator";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Button from "UI/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextFieldComponent from "UI/TextFieldComponent";
import SearchIcon from "@material-ui/icons/Search";

import { setStayDates } from "Components/Hotel/HotelSlice";
import {
  setFilterSearchSlice,
  setChildrenReducer,
} from "Components/Hotel/HotelSlice";

import styles from "Components/Hotel/Hotel.module.css";

const MultiSearchComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let today = moment().format(otherConstants.dateTimeFormat);
  let tomorrow = moment()
    .add(1, otherConstants.daysDifference)
    .format(otherConstants.dateTimeFormat)
    .toString();
  const checkInDate = today;
  const checkOutDate = tomorrow;
  const [filterSearch, setFilterSearch] = useState({
    searchText: otherConstants.emptyText,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    adults: otherConstants.defaultAdults,
    rooms: otherConstants.defaultRooms,
    children: otherConstants.defaultChildren,
  });
  const [component, setComponent] = useState(null);
  const [children, setChildren] = useState([]);
  const hotels = useSelector((state) => state.hotel.hotels);
  const searchHotelHandler = () => {
    if (filterSearch.searchText === otherConstants.emptyText) {
      setComponent(
        <div className={styles.errorDiv}> Search Box Cannot be Empty </div>
      );
    } else {
      dispatch(setFilterSearchSlice(filterSearch));
      dispatch(setStayDates({ start: today, end: tomorrow }));
      dispatch(setChildrenReducer(children));
      history.push(`/findHotels/${filterSearch.searchText}`);
    }
  };

  const handleChange = (e) => {
    setFilterSearch((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event, value) => {
    setComponent(null);
    setFilterSearch((prevFilter) => ({
      ...prevFilter,
      searchText: value,
    }));
  };

  const addChildHandler = (id) => {
    setChildren(
      children.map((item) => {
        if (item.id === id && item.age < otherConstants.maxChildrenAge) {
          return {
            ...item,
            age: item.age + 1,
          };
        }
        return item;
      })
    );
  };

  const incremenetAdults = () => {
    if (filterSearch.adults <= otherConstants.maxAdultsAllowed) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        adults: prevFilter.adults + 1,
      }));
    }
  };

  const decrementAdults = () => {
    if (filterSearch.adults > otherConstants.minGuestsAllowed) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        adults: prevFilter.adults - 1,
      }));
    }
  };

  const addRoomsHandler = () => {
    if (filterSearch.rooms < otherConstants.maxRoomsAllowed) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        rooms: prevFilter.rooms + 1,
      }));
    }
  };
  const removeRoomsHandler = () => {
    if (filterSearch.rooms > otherConstants.minRoomsBooked) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        rooms: prevFilter.rooms - 1,
      }));
    }
  };

  const decrementAdultsHandler = () => {
    if (filterSearch.children >= otherConstants.minChildrenAdded) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        children: prevFilter.children - 1,
      }));
      removeChildrenHandler();
    }
  };

  const addChildrenHandler = () => {
    if (filterSearch.children <= otherConstants.maxChildrenAllowed) {
      setChildren([
        ...children,
        {
          id: nextId(),
          age: 1,
        },
      ]);
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        children: prevFilter.children + 1,
      }));
    }
  };

  const removeChildrenHandler = () => {
    if (children.length === 1) {
      setChildren([]);
    } else {
      const newChildren = [...children];
      newChildren.splice(newChildren.length - 1);
      setChildren(newChildren);
    }
  };

  return (
    <div>
      {/* This Component is Present on The Home Page and Allows user to Search Hotels by area , landmark , Loaction , Checkin and checkout dates and number of Guests in Room facility */}
      {component}
      <label htmlFor={otherConstants.searchText}>Where</label>
      <br />
      <Autocomplete
        freeSolo
        id={otherConstants.autoComplete}
        disableClearable
        options={hotels.map((option) => option.name)}
        onChange={handleSubmit}
        renderInput={(params) => (
          <TextFieldComponent
            params={params}
            name={otherConstants.searchText}
            placeholder={otherConstants.searchPlaceholder}
            defaultValue={filterSearch.searchText}
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon />,
              type: otherConstants.searchType,
              required: true,
            }}
          />
        )}
      />
      <div className={styles.checkInDivInner}>
        <div className={styles.innerDivForCheckIn}>
          <label htmlFor={otherConstants.checkIn}>
            {otherConstants.checkInText}
          </label>
          <br />

          <TextFieldComponent
            changed={(e) => {
              handleChange(e);
            }}
            type={otherConstants.dateType}
            name={otherConstants.checkIn}
            id={otherConstants.dateType}
            defaultValue={today}
            inputProps={{
              min: filterSearch.checkIn,
              max: filterSearch.checkOut,
            }}
          />
        </div>
        <div className={styles.innerDivForCheckOut}>
          <label htmlFor={otherConstants.checkOut}>
            {otherConstants.checkOutText}
          </label>
          <br />
          <TextFieldComponent
            name={otherConstants.checkOut}
            changed={(e) => {
              handleChange(e);
            }}
            id={otherConstants.dateType}
            type={otherConstants.dateType}
            defaultValue={tomorrow}
            inputProps={{
              min: filterSearch.checkOut,
            }}
          />
        </div>
      </div>
      <br></br>
      <label>
        {filterSearch.adults +
          filterSearch.children +
          otherConstants.guestInfo +
          filterSearch.rooms +
          otherConstants.roomsText}
      </label>
      <div className={styles.outerDivForAdults}>
        <div className={styles.innerDivForAdults}>
          <lable>Adults</lable>
          <br />
          <Button class={styles.btnStyleAdults} clicked={decrementAdults}>
            {otherConstants.subtractIcon}
          </Button>
          <Button class={styles.btnStyleAdults}>{filterSearch.adults}</Button>
          <Button clicked={incremenetAdults} class={styles.btnStyleAdults}>
            {otherConstants.addIcon}
          </Button>
        </div>
        <div className={styles.divStyleForChildren}>
          <div>
            <lable>Rooms</lable>
            <br />
            <Button clicked={removeRoomsHandler} class={styles.btnStyleAdults}>
              {otherConstants.subtractIcon}
            </Button>
            <Button class={styles.btnStyleAdults}>{filterSearch.rooms}</Button>
            <Button clicked={addRoomsHandler} class={styles.btnStyleAdults}>
              {otherConstants.addIcon}
            </Button>
          </div>
        </div>
        <div className={styles.divStyleForChildren}>
          <div className={styles.innerDivStyleForChildren}>
            <lable>Children</lable>
            <br />
            <Button
              class={styles.btnStyleAdults}
              clicked={decrementAdultsHandler}
            >
              {otherConstants.subtractIcon}
            </Button>
            <Button class={styles.btnStyleAdults}>
              {filterSearch.children}
            </Button>
            <Button class={styles.btnStyleAdults} clicked={addChildrenHandler}>
              {otherConstants.addIcon}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.divStyleForAllChilds}>
        {children.map((child, index) => {
          return (
            <div className={styles.displayBlock}>
              <label htmlFor={index}>
                <strong>
                  {otherConstants.childText +
                    (index + 1) +
                    otherConstants.ageText}
                </strong>
              </label>
              <br></br>
              <div className={styles.displayFlex}>
                <Button class={styles.btnStyleAdults}>
                  {otherConstants.subtractIcon}
                </Button>
                {/* <label class={styles.labelStyles}>
                  <strong>{child.age}</strong>
                </label> */}
                <Button class={styles.btnStyleAdults}>{child.age}</Button>
                <Button
                  clicked={() => {
                    addChildHandler(child.id);
                  }}
                  class={styles.btnStyleAdults}
                >
                  {otherConstants.addIcon}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button class={styles.searchHotels} clicked={searchHotelHandler}>
        Search Hotels
      </Button>
    </div>
  );
};

export default MultiSearchComponent;
