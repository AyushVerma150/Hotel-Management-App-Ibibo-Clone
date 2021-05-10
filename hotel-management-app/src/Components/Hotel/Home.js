import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router";
import nextId from "react-id-generator";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";

import { fetchAllHotels, setStayDates } from "Components/Hotel/HotelSlice";
import {
  setFilterSearchSlice,
  setChildrenReducer,
  updateSearchText,
} from "Components/Hotel/HotelSlice";
import CardComponent from "UI/CardComponent";
import TextFieldComponent from "UI/TextFieldComponent";

import styles from "Components/Hotel/Hotel.module.css";

const Home = (props) => {
  const history = useHistory();
  const hotels = useSelector((state) => state.hotel.hotels);

  let today = moment().format("YYYY-MM-DD");
  let tomorrow = moment().add(1, "days").format("YYYY-MM-DD").toString();

  const [component, setComponent] = useState(null);
  const checkInDate = today;
  const checkOutDate = tomorrow;
  const [children, setChildren] = useState([]);
  const [filterSearch, setFilterSearch] = useState({
    searchText: "",
    checkIn: checkInDate,
    checkOut: checkOutDate,
    adults: 2,
    rooms: 1,
    children: 0,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllHotels());
  }, []);

  const searchHotelHandler = () => {
    if (filterSearch.searchText === "") {
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
  const HandleDestinationClick = (value) => {
    dispatch(setFilterSearchSlice(filterSearch));
    dispatch(setStayDates({ start: today, end: tomorrow }));
    dispatch(setChildrenReducer(children));
    dispatch(updateSearchText({ text: value }));
    history.push(`/findHotels/${value}`);
  };
  const destinations = useSelector((state) => state.hotel.destinations);

  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv}>
        {component}
        <div style={{ display: "block" }}>
          <label htmlFor="searchText">Where</label>
          <br />
          <Autocomplete
            freeSolo
            id="autocomplete"
            disableClearable
            options={hotels.map((option) => option.name)}
            onChange={handleSubmit}
            renderInput={(params) => (
              <TextFieldComponent
                params={params}
                name="searchText"
                placeholder="Search"
                defaultValue={filterSearch.searchText}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon />,
                  type: "search",
                  required: true,
                }}
              />
            )}
          />
          <div className={styles.checkInDivInner}>
            <div className={styles.innerDivForCheckIn}>
              <label htmlFor="checkIn">Check In</label>
              <br />

              <TextFieldComponent
                changed={(e) => {
                  handleChange(e);
                }}
                type="date"
                name="checkIn"
                id="date"
                defaultValue={today}
                inputProps={{
                  min: filterSearch.checkIn,
                  max: filterSearch.checkOut,
                }}
              />
            </div>
            <div className={styles.innerDivForCheckOut}>
              <label htmlFor="checkOut">Check Out</label>
              <br />
              <TextFieldComponent
                name="checkOut"
                changed={(e) => {
                  handleChange(e);
                }}
                id="date"
                type="date"
                defaultValue={tomorrow}
                inputProps={{
                  min: filterSearch.checkOut,
                }}
              />
            </div>
          </div>
          <br></br>
          <label>
            {filterSearch.adults + filterSearch.children} Guest{" "}
            {filterSearch.rooms} Room
          </label>
          <div className={styles.outerDivForAdults}>
            <div className={styles.innerDivForAdults}>
              <lable>Adults</lable>
              <br />
              <Button
                className={styles.btnStyleAdults}
                onClick={() => {
                  if (filterSearch.adults > 1) {
                    setFilterSearch((prevFilter) => ({
                      ...prevFilter,
                      adults: prevFilter.adults - 1,
                    }));
                  }
                }}
              >
                -
              </Button>
              <Button className={styles.btnStyleAdults}>
                {filterSearch.adults}
              </Button>
              <Button
                className={styles.btnStyleAdults}
                name="incrementAdults"
                onClick={() => {
                  setFilterSearch((prevFilter) => ({
                    ...prevFilter,
                    adults: prevFilter.adults + 1,
                  }));
                }}
              >
                +
              </Button>
            </div>
            <div className={styles.divStyleForChildren}>
              <div>
                <lable style={{ textAlign: "center" }}>Rooms</lable>
                <br />
                <Button
                  className={styles.btnStyleAdults}
                  onClick={() => {
                    if (filterSearch.rooms > 1) {
                      setFilterSearch((prevFilter) => ({
                        ...prevFilter,
                        rooms: prevFilter.rooms - 1,
                      }));
                    }
                  }}
                >
                  -
                </Button>
                <Button className={styles.btnStyleAdults}>
                  {filterSearch.rooms}
                </Button>
                <Button
                  className={styles.btnStyleAdults}
                  onClick={() => {
                    if (filterSearch.rooms < 8) {
                      setFilterSearch((prevFilter) => ({
                        ...prevFilter,
                        rooms: prevFilter.rooms + 1,
                      }));
                    }
                  }}
                >
                  +
                </Button>
              </div>
            </div>
            <div className={styles.divStyleForChildren}>
              <div className={styles.innerDivStyleForChildren}>
                <lable>Children</lable>
                <br />
                <Button
                  className={styles.btnStyleAdults}
                  onClick={() => {
                    if (filterSearch.children >= 1) {
                      setFilterSearch((prevFilter) => ({
                        ...prevFilter,
                        children: prevFilter.children - 1,
                      }));
                    }
                  }}
                >
                  -
                </Button>
                <Button className={styles.btnStyleAdults}>
                  {filterSearch.children}
                </Button>
                <Button
                  className={styles.btnStyleAdults}
                  onClick={() => {
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
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.divStyleForAllChilds}>
            {children.map((child, index) => {
              return (
                <div className={styles.displayBlock}>
                  <label htmlFor={index}>
                    {" "}
                    <strong>{"Child " + (index + 1) + " Age"}</strong>
                  </label>
                  <br></br>
                  <div className={styles.displayFlex}>
                    <Button className={styles.btnStyleForSubmit}>
                      {" "}
                      <i
                        className={styles.colorblack}
                        class="fas fa-minus"
                      ></i>{" "}
                    </Button>
                    <label className={styles.labelStyles}>
                      <strong>{child.age}</strong>
                    </label>
                    <Button
                      onClick={() => {
                        setChildren(
                          children.map((item) => {
                            if (item.id === child.id) {
                              return {
                                ...item,
                                age: item.age + 1,
                              };
                            }
                            return item;
                          })
                        );
                      }}
                      className={styles.btnStyleForSubmit}
                    >
                      <i className={styles.colorBlack} class="fas fa-plus"></i>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button className={styles.searchHotels} onClick={searchHotelHandler}>
          Search Hotels
        </Button>
      </div>
      <br />
      <div className={styles.destinationsDiv}>
        <p className={styles.heading}>Popular Destinations</p>
        <hr className={styles.colorblack} />
      </div>

      <div className={styles.HotelDiv}>
        {destinations.map((hotel) => {
          return (
            <CardComponent
              image={hotel.image}
              class={styles.HotelCard}
              imageStyle={styles.image}
              clicked={() => {
                setFilterSearch((prevFilter) => ({
                  ...prevFilter,
                  searchText: hotel.name,
                }));
                HandleDestinationClick(hotel.name);
              }}
              cardTitle={[
                {
                  heading: hotel.name,
                  para: "",
                },
              ]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
