import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllHotels, setStayDates } from "Components/Hotel/HotelSlice";
import { Card, Button } from "react-bootstrap";
import styles from "Components/Hotel/Hotel.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router";
import {
  setFilterSearchSlice,
  setChildrenReducer,
  updateSearchText,
} from "Components/Hotel/HotelSlice";
import nextId from "react-id-generator";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
import CardComponent from "UI/CardComponent";

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllHotels());
  }, []);

  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  console.log(currentDate);

  const history = useHistory();
  const hotels = useSelector((state) => state.hotel.hotels);

  let today = moment().format("YYYY-MM-DD");
  let tomorrow = moment().add(1, "days").format("YYYY-MM-DD").toString();

  const [component, setComponent] = useState(null);

  const [checkInDate, checkInDateChange] = useState(today);
  const [checkOutDate, checkOutDateChange] = useState(tomorrow);
  const [children, setChildren] = useState([]);
  const [filterSearch, setFilterSearch] = useState({
    searchText: "",
    checkIn: checkInDate,
    checkOut: checkOutDate,
    adults: 2,
    rooms: 1,
    children: 0,
  });

  const searchHotelHandler = () => {
    if (filterSearch.searchText === "") {
      setComponent(
        <div style={{ color: "red" }}> Search Box Cannot be Empty </div>
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
          <label htmlFor="nameField">Where</label>
          <br />
          <Autocomplete
            freeSolo
            id="autocomplete"
            disableClearable
            options={hotels.map((option) => option.name)}
            onChange={handleSubmit}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                aria-label="enter search"
                name="searchText"
                placeholder="Search"
                value={filterSearch.searchText}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon />,
                  type: "search",
                  required: true,
                }}
              />
            )}
          />
          <div style={{ display: "flex", marginTop: "10px" }}>
            <div style={{ left: "0", width: "30%", marginRight: "10px" }}>
              <label htmlFor="checkIn">Check In</label>
              <br />
              <TextField
                onChange={(e) => {
                  handleChange(e);
                }}
                name="checkIn"
                id="date"
                type="date"
                defaultValue={today}
                inputProps={{
                  min: filterSearch.checkIn,
                  max: filterSearch.checkOut,
                }}
              />
            </div>
            <div style={{ right: "0", width: "30%" }}>
              <label htmlFor="checkOut">Check Out</label>
              <br />
              <TextField
                name="checkOut"
                onChange={(e) => {
                  handleChange(e);
                }}
                disablePast
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
          <div
            style={{
              width: "400px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "block", textAlign: "center" }}>
              <lable style={{ textAlign: "center" }}>Adults</lable>
              <br />
              <Button
                style={{ marginLeft: "3px", marginRight: "3px" }}
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
              <Button style={{ marginLeft: "3px", marginRight: "3px" }}>
                {filterSearch.adults}
              </Button>
              <Button
                style={{ marginLeft: "3px", marginRight: "3px" }}
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
            <div style={{ display: "flex", right: "0", marginLeft: "10px" }}>
              <div style={{ display: "block", textAlign: "center" }}>
                <lable style={{ textAlign: "center" }}>Rooms</lable>
                <br />
                <Button
                  style={{ marginLeft: "3px", marginRight: "3px" }}
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
                <Button style={{ marginLeft: "3px", marginRight: "3px" }}>
                  {filterSearch.rooms}
                </Button>
                <Button
                  style={{ marginLeft: "3px", marginRight: "3px" }}
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
            <div style={{ display: "flex", right: "0", marginLeft: "10px" }}>
              <div style={{ display: "block", textAlign: "center" }}>
                <lable style={{ textAlign: "center" }}>Children</lable>
                <br />
                <Button
                  style={{ marginLeft: "3px", marginRight: "3px" }}
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
                <Button style={{ marginLeft: "3px", marginRight: "3px" }}>
                  {filterSearch.children}
                </Button>
                <Button
                  style={{ marginLeft: "3px", marginRight: "3px" }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            {children.map((child, index) => {
              return (
                <div style={{ display: "block" }}>
                  <label htmlFor={index}>
                    {" "}
                    <strong>{"Child " + (index + 1) + " Age"}</strong>
                  </label>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{
                        border: "none",
                        outline: "none",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        height: "30px",
                        width: "40px",
                        borderRadius: "10px",
                      }}
                    >
                      {" "}
                      <i
                        style={{ color: "black" }}
                        class="fas fa-minus"
                      ></i>{" "}
                    </Button>
                    <label
                      style={{
                        textAlign: "center",
                        backgroundColor: "transparent",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        height: "30px",
                        width: "40px",
                        borderRadius: "10px",
                      }}
                    >
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
                      style={{
                        border: "none",
                        outline: "none",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        height: "30px",
                        width: "40px",
                        borderRadius: "10px",
                      }}
                    >
                      <i style={{ color: "black" }} class="fas fa-plus"></i>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          style={{
            height: "50px",
            width: "200px",
            marginTop: "30px",
            marginLeft: "150px",
          }}
          onClick={searchHotelHandler}
        >
          Search Hotels
        </Button>
      </div>
      <br />
      <div
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className={styles.heading}>Popular Destinations</p>
        <hr style={{ color: "black" }} />
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

            // <Card
            //   className={styles.HotelCard}
            //   onClick={() => {
            //     setFilterSearch((prevFilter) => ({
            //       ...prevFilter,
            //       searchText: hotel.name,
            //     }));
            //     HandleDestinationClick(hotel.name);
            //   }}
            // >
            //   <Card.Img src={hotel.image} className={styles.image}></Card.Img>
            //   <Card.Body>
            //     <Card.Title>
            //       <p className={styles.heading}>{hotel.name}</p>
            //     </Card.Title>
            //   </Card.Body>
            // </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
