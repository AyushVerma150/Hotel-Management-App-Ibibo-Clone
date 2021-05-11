const { validationResult } = require("express-validator/check");
const { Op } = require("sequelize");
const Request = require("../utils/request");
const Response = require("../utils/response");
const Hotel = require("../model/hotel");
const Room = require("../model/room");
const Destination = require("../model/destination");
const shortId = require("shortid");
const constants = require("../utils/constants");
const { BadRequest } = require("../utils/errors");
const HotelAmenities = require("../model/hotelAmenities");
const Review = require("../model/review");
const User = require("../model/user");
const Booking = require("../model/booking");
require("custom-env").env(process.env.NODE_ENV); //custom env file

// created a common UserController class to handle all the controller information like creating a user , user login...
module.exports = class HotelController {
  addHotel = async (req, res, next) => {
    const response = new Response(res); //response handler
    try {
      let bodyData = {};
      const handleRequest = new Request(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //check for validations
        const { msg } = errors.array()[0];
        return response.setError(msg, constants.status.unprocessable);
      }
      const {
        type,
        name,
        state,
        location,
        landmark,
        discountPrice,
        startPrice,
      } = handleRequest.getBody(bodyData);

      const hotelCreated = await Hotel.create({
        hotelId: shortId.generate(),
        type,
        name,
        state,
        location,
        landmark,
        discountPrice,
        startPrice,
      });

      if (hotelCreated) {
        return response.setData(hotelCreated, "", constants.status.ok);
      }
      return response.setError(hotelCreated, constants.status.unprocessable);
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  fetchHotel = async (req, res, next) => {
    const response = new Response(res);
    try {
      const hotelsFetched = await Hotel.findAll();
      if (hotelsFetched) {
        response.setData(hotelsFetched, "", constants.status.ok);
      }
      return response.setError(hotelsFetched, constants.status.unprocessable);
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  addDestination = async (req, res, next) => {
    const response = new Response(res); //response handler
    try {
      const { name } = handleRequest.getBody(bodyData);
      const destinationAdded = await Destination.create({
        name,
      });

      if (hotelCreated) {
        return response.setData(destinationAdded, "", constants.status.ok);
      }
      return response.setError(
        destinationAdded,
        constants.status.unprocessable
      );
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  addAmenities = async (req, res, next) => {
    const response = new Response(res); //response handler
    const handleRequest = new Request(req);
    try {
      const { name, hotelId, category } = handleRequest.getBody({});
      const existingHotel = await Hotel.findOne({
        where: { hotelId: hotelId },
      });
      if (existingHotel) {
        const amenityAdded = await HotelAmenities.create({
          name: name,
          category: category,
          hotelId: existingHotel.id,
        });
        if (amenityAdded) {
          return response.setData(amenityAdded, "", constants.status.ok);
        }
        return response.setError(
          destinationAdded,
          constants.status.unprocessable
        );
      }
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  fetchHotelWithRooms = async (req, res, next) => {
    let bodyData = {};
    const response = new Response(res);
    const handleRequest = new Request(req);
    const { hotelId } = handleRequest.getBody(bodyData);

    try {
      const hotel = await Hotel.findOne({
        where: {
          id: hotelId,
        },
        include: {
          model: Room,
          attributes: [
            "type",
            "price",
            "discountPrice",
            "bedSize",
            "capacity",
            "area",
          ],
          required: true,
        },
      });
      if (hotel) {
        return response.setData(hotel, "", constants.status.ok);
      }
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  fetchHotelReviews = async (req, res, next) => {
    let bodyData = {};
    const response = new Response(res);
    const handleRequest = new Request(req);
    const { hotelId } = handleRequest.getBody(bodyData);

    try {
      const reviewsFetched = await Review.findAll({
        where: {
          hotelId: hotelId,
        },
        include: {
          model: User,
          attributes: constants.userAttributes,
          required: true,
        },
      });
      if (reviewsFetched) {
        return response.setData(reviewsFetched, "", constants.status.ok);
      }
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  createBooking = async (req, res, next) => {
    let bodyData = {};
    const response = new Response(res);
    const handleRequest = new Request(req);
    const {
      amount,
      roomsBooked,
      adults,
      children,
      checkIn,
      checkOut,
      primaryGuest,
      madeOfPayment,
      hotelId,
      userId,
    } = handleRequest.getBody(bodyData);

    const bookingCreated = await Booking.create({
      amount,
      roomsBooked,
      adults,
      children,
      checkIn,
      checkOut,
      primaryGuest,
      hotelId,
      userId,
    });
    if (bookingCreated) {
      return response.setData(bookingCreated, "", constants.status.ok);
    }
    return response.setError(bookingCreated, constants.status.unprocessable);
  };

  addHotelRooms = async (req, res, next) => {
    let bodyData = {};
    const response = new Response(res);
    const handleRequest = new Request(req);
    const {
      hotelId,
      type,
      price,
      discountPrice,
      bedSize,
      area,
      capacity,
    } = handleRequest.getBody(bodyData);
    const existingHotel = await Hotel.findOne({ where: { hotelId: hotelId } });
    const roomCreated = await existingHotel.createRoom({
      type,
      price,
      discountPrice,
      bedSize,
      area,
      capacity,
    });
    if (roomCreated) {
      return response.setData(roomCreated, "", constants.status.ok);
    }
    return response.setError(roomCreated, constants.status.unprocessable);
  };

  fetchAllBookings = async (req, res, next) => {
    let bodyData = {};
    const response = new Response(res);
    const handleRequest = new Request(req);
    const { userId } = handleRequest.getBody(bodyData);
    try {
      const allBookings = await Booking.findAll({ where: { userId: userId } });
      if (allBookings) {
        return response.setData(allBookings, "", constants.status.ok);
      }
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  fetchAllReviews = async (req, res, next) => {
    let bodyData = {};
    const response = new Response(res);
    const handleRequest = new Request(req);
    const { userId } = handleRequest.getBody(bodyData);
    try {
      const allReviews = await Review.findAll({ where: { userId: userId } });
      if (allReviews) {
        return response.setData(allReviews, "", constants.status.ok);
      }
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };

  filterHotels = async (req, res, next) => {
    const response = new Response(res);
    let maxRange = constants.filterForHotels.maxRange;
    let minRange = constants.filterForHotels.minRange;
    let amenity = constants.filterForHotels.amenity;
    let hotelType = constants.filterForHotels.hotelType;

    const handleRequest = new Request(req);
    try {
      let where = {
        [Op.and]: [
          {
            discountPrice: {
              [Op.gt]: minRange,
              [Op.lte]: maxRange,
            },
          },
          {
            type: hotelType,
          },
        ],
      };

      //Implement With Price Range First....
      const filters = handleRequest.getBody({});
      if (filters.price) {
        maxRange = filters.maxPriceRange;
        minRange = filters.minPriceRange;
      }

      if (filters.amenitiesAdded && filters.amenities.length >= 1) {
        amenity = filters.amenities.slice();
      }

      if (filters.hotel) {
        hotelType = constants.typesOfHotel.hotel;
      } else if (filters.villa) {
        hotelType = constants.typesOfHotel.villa;
      } else if (filters.motel) {
        hotelType = constants.typesOfHotel.motel;
      }

      if (filters.amenitiesAdded) {
        const hotelsFetched = await Hotel.findAll({
          where: {
            [Op.and]: [
              {
                discountPrice: {
                  [Op.gt]: minRange,
                  [Op.lte]: maxRange,
                },
              },
              {
                type: hotelType,
              },
              {
                "$hotelAmenities.name$": {
                  [Op.in]: [amenity],
                },
              },
            ],
          },
          include: [
            {
              model: HotelAmenities,
            },
          ],
        });

        return response.setData(hotelsFetched, "", constants.status.ok);
      } else {
        const hotelsFetched = await Hotel.findAll({
          where: {
            [Op.and]: [
              {
                discountPrice: {
                  [Op.gt]: minRange,
                  [Op.lte]: maxRange,
                },
              },
              {
                type: hotelType,
              },
            ],
          },
          include: [
            {
              model: HotelAmenities,
            },
          ],
        });

        return response.setData(hotelsFetched, "", constants.status.ok);
      }
    } catch (err) {
      return response.setError(err, constants.status.unprocessable);
    }
  };
};
