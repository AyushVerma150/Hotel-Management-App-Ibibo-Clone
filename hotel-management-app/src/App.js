import HomeComponent from "../src/Components/Hotel/Home";
import React, { useState } from "react";
import "./App.css";
import { AppBar, Toolbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HotelList from "Components/Hotel/HotelList";
import styles from "Components/Hotel/Hotel.module.css";
import SingleHotelView from "Components/Hotel/SingleHotelView";
import SearchedHotels from "Components/Hotel/SearchedHotels";
import Checkout from "Components/Checkout/Checkout";
import ModalComponent from "UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getModalState, showModal, hideModal } from "UI/Modal/ModalSlice";
import Login from "Components/User/Login";
import SignUp from "Components/User/SignUp";

const App = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(getModalState);
  const [userStatus, setUserStatus] = useState("login");

  const currentUser = useSelector((state) => state.user.currentUser);

  const navLinks = [
    { title: "about us", path: "/about-us" },
    { title: "authorize", path: "/authorize" },
  ];

  return (
    <div className="App">
      <AppBar
        position="static"
        style={{
          backgroundColor: "rgb(255, 109, 56)",
          zIndex: "20",
          display: "flex",
          fontFamily: "Poppins",
        }}
      >
        <Toolbar
          style={{ display: "flex", width: "100%", fontFamily: "Poppins" }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            style={{ width: "55%", left: "0", marginLeft: "-30px" }}
          >
            <Home fontSize="medium" style={{ marginLeft: "-550px" }} />
          </IconButton>
          <List
            style={{
              width: "20%",
              justifyContent: "space-evenly",
              marginLeft: "30px",
              right: "0",
              fontFamily: "Poppins",
            }}
            component="nav"
            aria-labelledby="main navigation"
            className={styles.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => {
              return (
                <a href={path} key={title} className={styles.linkText}>
                  <ListItem button>
                    <ListItemText
                      primary={title}
                      style={{ fontFamily: "Poppins", textDecoration: "none" }}
                    />
                  </ListItem>
                </a>
              );
            })}
          </List>
          <div
            style={{
              backgroundColor: "white",
              height: "50px",
              right: "0px",
              width: "20%",
              borderRadius: "10px",
              color: "rgb(255, 109, 56)",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", width: "100%" }}>
              <img
                src={
                  !currentUser
                    ? "http://www.gravatar.com/avatar/?d=mp"
                    : currentUser.userImage
                }
                alt="user"
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  left: "0",
                  marginTop: "10px",
                  marginLeft: "20px",
                }}
              />
              <p
                style={{
                  marginTop: "13px",
                  fontWeight: "Bold",
                  fontFamily: "Poppins",
                  right: "0",
                  width: "45%",
                  marginLeft: "20px",
                }}
              >
                {!currentUser ? (
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(showModal());
                    }}
                  >
                    Sign Up | Login
                  </a>
                ) : (
                  <div style={{ display: "flex" }}>
                    <p style={{ width: "80%", left: "0" }}>
                      {"Hey , " + currentUser.userName.split(" ")[0]}
                    </p>
                    <label
                      style={{
                        fontWeight: "Bold",
                        fontFamily: "Poppins",
                        right: "0",
                        width: "15%",
                        color: "black",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <strong>Logout</strong>
                    </label>
                  </div>
                )}
              </p>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <br />
                <HomeComponent />
              </div>
            )}
          />
          <Route
            exact
            path="/Destinations/:destinationName"
            component={HotelList}
          />
          <Route exact path="/hotels/:hotelName" component={SingleHotelView} />
          <Route
            exact
            path="/findHotels/:searchText"
            component={SearchedHotels}
          />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </Router>

      <ModalComponent
        modalHeader={userStatus}
        title="Login or Sign Up"
        show={modalState}
      >
        {userStatus === "login" ? (
          <div>
            <Login />
            <br />
            <a style={{ marginLeft: "28%" }}>
              Are you new here ?{" "}
              <strong
                onClick={() => {
                  //alert( "Will This work" );
                  setUserStatus("signup");
                }}
                style={{ cursor: "pointer", fontFamily: "Poppins" }}
              >
                Sign Up
              </strong>{" "}
            </a>
          </div>
        ) : (
          <div>
            <SignUp />
            <br />
            <a style={{ marginLeft: "25%" }}>
              Already have an account ?{" "}
              <strong
                onClick={() => {
                  //alert( "Will This work" );
                  setUserStatus("login");
                }}
                style={{ cursor: "pointer", fontFamily: "Poppins" }}
              >
                Login
              </strong>{" "}
            </a>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default App;
