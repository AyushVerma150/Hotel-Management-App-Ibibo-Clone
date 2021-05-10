import React, { useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { List } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomeComponent from "../src/Components/Hotel/Home";
import HotelList from "Components/Hotel/HotelList";
import SingleHotelView from "Components/Hotel/SingleHotelView";
import SearchedHotels from "Components/Hotel/SearchedHotels";
import Checkout from "Components/Checkout/Checkout";
import ModalComponent from "UI/Modal/Modal";
import { getModalState, showModal } from "UI/Modal/ModalSlice";
import Login from "Components/User/Login";
import SignUp from "Components/User/SignUp";
import UserProfile from "Components/User/UserProfile";

import "./App.css";
import styles from "Components/Hotel/Hotel.module.css";
//import { useHistory, Link } from "react-router-dom";

const App = () => {
  const appBarStyling = {
    backgroundColor: "rgb(255, 109, 56)",
    zIndex: "20",
    display: "flex",
    fontFamily: "Poppins",
  };

  const toolBarStyling = {
    display: "flex",
    width: "100%",
    fontFamily: "Poppins",
  };

  const listStyling = {
    width: "20%",
    justifyContent: "space-evenly",
    marginLeft: "30px",
    right: "0",
    fontFamily: "Poppins",
  };

  const history = useHistory();

  const handleUserProfileClick = () => {
    alert(JSON.stringify(history));
  };

  const dispatch = useDispatch();
  const modalState = useSelector(getModalState);
  const [userStatus, setUserStatus] = useState("login");

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      <Router>
        <AppBar position="static" style={appBarStyling}>
          <Toolbar style={toolBarStyling}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              style={{ width: "55%", left: "0", marginLeft: "-30px" }}
            >
              <Home fontSize="medium" style={{ marginLeft: "-550px" }} />
            </IconButton>
            <List
              style={listStyling}
              component="nav"
              aria-labelledby="main navigation"
              className={styles.navDisplayFlex}
            >
              <Link to="/userProfile">
                <p
                  className={styles.paraStyles}
                  onClick={handleUserProfileClick}
                >
                  User Profile
                </p>
              </Link>
            </List>
            <div className={styles.divStylingApp}>
              <div className={styles.ToolBarStyling}>
                <img
                  src={
                    !currentUser
                      ? "http://www.gravatar.com/avatar/?d=mp"
                      : currentUser.userImage
                  }
                  alt="user"
                  className={styles.UserProfileDiv}
                />
                <p className={styles.UserProfileInnerDiv}>
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
                    <div className={styles.displayFlex}>
                      <p className={styles.UserInfoInnerDiv}>
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
                        onClick={handleUserProfileClick}
                      >
                        <strong>View Profile</strong>
                      </label>
                    </div>
                  )}
                </p>
              </div>
            </div>
          </Toolbar>
        </AppBar>
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
          <Route exact path="/userProfile" component={UserProfile} />
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
            <a className={styles.AnchorTagStyle}>
              Are you new here ?{" "}
              <strong
                onClick={() => {
                  //alert( "Will This work" );
                  setUserStatus("signup");
                }}
                className={styles.stongStyles}
              >
                Sign Up
              </strong>{" "}
            </a>
          </div>
        ) : (
          <div>
            <SignUp />
            <br />
            <a className={styles.AnchorTagStyle}>
              Already have an account ?{" "}
              <strong
                onClick={() => {
                  //alert( "Will This work" );
                  setUserStatus("login");
                }}
                className={styles.stongStyles}
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
