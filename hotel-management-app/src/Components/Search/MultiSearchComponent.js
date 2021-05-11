import React, { useState } from "react";
import otherConstants from "Constants/OtherConstants";
import styles from "Components/Hotel/Hotel.module.css";
import { Button } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextFieldComponent from "UI/TextFieldComponent";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
import { fetchAllHotels, setStayDates } from "Components/Hotel/HotelSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterSearchSlice,
  setChildrenReducer,
  updateSearchText,
} from "Components/Hotel/HotelSlice";
import nextId from "react-id-generator";
import { useHistory } from "react-router";

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
    adults: 2,
    rooms: 1,
    children: 0,
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
        if (item.id === id) {
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
    setFilterSearch((prevFilter) => ({
      ...prevFilter,
      adults: prevFilter.adults + 1,
    }));
  };

  const decrementAdults = () => {
    if (filterSearch.adults > 1) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        adults: prevFilter.adults - 1,
      }));
    }
  };

  const addRoomsHandler = () => {
    if (filterSearch.rooms < 8) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        rooms: prevFilter.rooms + 1,
      }));
    }
  };
  const removeRoomsHandler = () => {
    if (filterSearch.rooms > 1) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        rooms: prevFilter.rooms - 1,
      }));
    }
  };

  const decrementAdultsHandler = () => {
    if (filterSearch.children >= 1) {
      setFilterSearch((prevFilter) => ({
        ...prevFilter,
        children: prevFilter.children - 1,
      }));
    }
  };

  const addChildrenHandler = () => {
    if (filterSearch.children <= 3) {
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

  return (
    <div>
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
          <Button className={styles.btnStyleAdults} onClick={decrementAdults}>
            {otherConstants.subtractIcon}
          </Button>
          <Button className={styles.btnStyleAdults}>
            {filterSearch.adults}
          </Button>
          <Button onClick={incremenetAdults} className={styles.btnStyleAdults}>
            {otherConstants.addIcon}
          </Button>
        </div>
        <div className={styles.divStyleForChildren}>
          <div>
            <lable>Rooms</lable>
            <br />
            <Button
              onClick={removeRoomsHandler}
              className={styles.btnStyleAdults}
            >
              {otherConstants.subtractIcon}
            </Button>
            <Button className={styles.btnStyleAdults}>
              {filterSearch.rooms}
            </Button>
            <Button onClick={addRoomsHandler} className={styles.btnStyleAdults}>
              {otherConstants.addIcon}
            </Button>
          </div>
        </div>
        <div className={styles.divStyleForChildren}>
          <div className={styles.innerDivStyleForChildren}>
            <lable>Children</lable>
            <br />
            <Button
              className={styles.btnStyleAdults}
              onClick={decrementAdultsHandler}
            >
              {otherConstants.subtractIcon}
            </Button>
            <Button className={styles.btnStyleAdults}>
              {filterSearch.children}
            </Button>
            <Button
              className={styles.btnStyleAdults}
              onClick={addChildrenHandler}
            >
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
                <Button className={styles.btnStyleForSubmit}>
                  {otherConstants.subtractIcon}
                </Button>
                <label className={styles.labelStyles}>
                  <strong>{child.age}</strong>
                </label>
                <Button
                  onClick={() => {
                    addChildHandler(child.id);
                  }}
                  className={styles.btnStyleForSubmit}
                >
                  {otherConstants.addIcon}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button className={styles.searchHotels} onClick={searchHotelHandler}>
        Search Hotels
      </Button>
    </div>
  );
};

export default MultiSearchComponent;
