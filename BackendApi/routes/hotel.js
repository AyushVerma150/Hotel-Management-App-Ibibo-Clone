const express = require("express");
const router = express.Router();
//importing the controller class
const HotelController = require("../controller/hotelControls");
const hotelControls = new HotelController();

//router to handle a register request using POST method

router.post("/addHotel", (req, res, next) => {
  hotelControls.addHotel(req, res, next);
});

router.get("/fetchAllHotels", (req, res, next) => {
  hotelControls.fetchHotel(req, res, next);
  // controller.createUser( req, res, next );
});

router.post("/AddDestinations", (req, res, next) => {
  hotelControls.addDestination(req, res, next);
});

router.post("/filterHotels", (req, res, next) => {
  hotelControls.filterHotels(req, res, next);
});

router.post("/addHotelAmenity", (req, res, next) => {
  hotelControls.addAmenities(req, res, next);
});

router.post("/addRoom", (req, res, next) => {
  hotelControls.addHotelRooms(req, res, next);
});

router.post("/fetchRooms", (req, res, next) => {
  hotelControls.fetchHotelWithRooms(req, res, next);
});

router.post("/fetchReviews", (req, res, next) => {
  hotelControls.fetchHotelReviews(req, res, next);
});

router.post("/createBooking", (req, res, next) => {
  hotelControls.createBooking(req, res, next);
});

router.post("/fetchAllBookings", (req, res, next) => {
  hotelControls.fetchAllBookings(req, res, next);
});

router.post("/fetchAllReviews", (req, res, next) => {
  hotelControls.fetchAllReviews(req, res, next);
});

module.exports = router;
