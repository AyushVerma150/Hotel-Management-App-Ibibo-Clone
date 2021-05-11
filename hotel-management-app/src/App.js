import React, { useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Home, List } from "@material-ui/icons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "../src/Components/Hotel/Home";
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
import otherConstants from "Constants/OtherConstants";

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
    color: "black",
  };

  const dispatch = useDispatch();
  const modalState = useSelector(getModalState);
  const [userStatus, setUserStatus] = useState(otherConstants.loginState);

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      <Router>
        <AppBar position={otherConstants.static} style={appBarStyling}>
          <Toolbar style={toolBarStyling}>
            <IconButton
              color={otherConstants.inheritColor}
              className={styles.iconButton}
            >
              <Home className={styles.extremeLeft} />
            </IconButton>
            <List
              style={listStyling}
              component={otherConstants.navComponent}
              className={styles.navDisplayFlex}
            >
              <Link to={otherConstants.userProfilePath}>
                <p className={styles.paraStyles}>
                  {otherConstants.viewProfile}
                </p>
              </Link>
            </List>
            <div className={styles.divStylingApp}>
              <div className={styles.ToolBarStyling}>
                <img
                  src={
                    !currentUser
                      ? otherConstants.dummyUserImage
                      : currentUser.userImage
                  }
                  alt={otherConstants.imageAlt}
                  className={styles.UserProfileDiv}
                />
                <p className={styles.UserProfileInnerDiv}>
                  {!currentUser ? (
                    <p
                      className={styles.cursorPointer}
                      onClick={() => {
                        dispatch(showModal());
                      }}
                    >
                      {otherConstants.signUpOrLogin}
                    </p>
                  ) : (
                    <div className={styles.displayFlex}>
                      <p className={styles.UserInfoInnerDiv}>
                        {otherConstants.heyUser +
                          currentUser.userName.split(" ")[0]}
                      </p>
                      <label className={styles.viewProfileLabel}>
                        <strong>{otherConstants.viewProfile}</strong>
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
            path={otherConstants.pathToHomePage}
            render={() => (
              <div>
                <br />
                <HomeComponent />
              </div>
            )}
          />
          <Route
            exact
            path={otherConstants.pathToHotelView}
            component={SingleHotelView}
          />
          <Route
            exact
            path={otherConstants.pathToFindHotels}
            component={SearchedHotels}
          />
          <Route
            exact
            path={otherConstants.pathToCheckOut}
            component={Checkout}
          />
          <Route
            exact
            path={otherConstants.pathToUserProfile}
            component={UserProfile}
          />
        </Switch>
      </Router>

      <ModalComponent
        modalHeader={userStatus}
        title={otherConstants.signUpOrLogin}
        show={modalState}
      >
        {userStatus === otherConstants.loginState ? (
          <div>
            <Login />
            <br />
            <p className={styles.AnchorTagStyle}>
              {otherConstants.loginNote}
              <strong
                onClick={() => {
                  setUserStatus(otherConstants.signupState);
                }}
                className={styles.stongStyles}
              >
                {otherConstants.signUp}
              </strong>
            </p>
          </div>
        ) : (
          <div>
            <SignUp />
            <br />
            <p className={styles.AnchorTagStyle}>
              {otherConstants.signUpNote}
              <strong
                onClick={() => {
                  setUserStatus(otherConstants.loginState);
                }}
                className={styles.stongStyles}
              >
                {otherConstants.login}
              </strong>
            </p>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default App;
