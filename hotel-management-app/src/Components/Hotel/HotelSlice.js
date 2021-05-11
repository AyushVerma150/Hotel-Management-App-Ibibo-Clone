import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../AxiosConfig";

import otherConstants from "Constants/OtherConstants";
import { enableFilterCheck } from "../../Utils/UtilityFunctions";

const initialState = {
  hotels: [],
  status: null,
  error: null,
  filteredSearch: null,
  children: [],
  filtersEnabled: false,
  appliedFilters: {
    amenitiesAdded: false,
    breakfast: false,
    internet: false,
    cancellation: false,
    veryLowPrice: false,
    lowPrice: false,
    mediumPrice: false,
    highPrice: false,
    veryHighPrice: false,
    price: false,
    veryHighRating: false,
    highRating: false,
    mediumRating: false,
    lowRating: false,
    hotel: false,
    motel: false,
    villa: false,
    minPriceRange: null,
    maxPriceRange: null,
    amenities: [],
  },
  hotelWithRooms: [],
  currentHotelReviews: [],
  hotelSelected: [],
  stayStartDay: null,
  stayEndDay: null,
  bookingsMade: [],
  bookingStatus: false,
  destinations: otherConstants.destinationsInformation,
};

export const fetchAllHotels = createAsyncThunk(
  "hotel/fetchAllHotels",
  async (values) => {
    try {
      const result = await axiosInstance.get(
        otherConstants.fetchHotelsPath,
        values
      );
      return result.data.data;
    } catch (err) {
      throw new Error(otherConstants.requestDenied);
    }
  }
);

export const filterHotels = createAsyncThunk(
  "hotel/filterHotels",
  async (values) => {
    try {
      const result = await axiosInstance.post(
        otherConstants.filterHotelsPath,
        values
      );
      return result.data.data;
    } catch (err) {
      throw new Error(otherConstants.requestDenied);
    }
  }
);

export const fetchHotelReviews = createAsyncThunk(
  "hotel/fetchHotelReviews",
  async (values) => {
    try {
      const result = await axiosInstance.post(
        otherConstants.fetchReviewsPath,
        values
      );
      return result.data.data;
    } catch (err) {
      throw new Error(otherConstants.requestDenied);
    }
  }
);

export const createBooking = createAsyncThunk(
  "hotel/createBooking",
  async (values) => {
    try {
      const result = await axiosInstance.post(
        otherConstants.createBookingsPath,
        values
      );
      return result.data.data;
    } catch (err) {
      throw new Error(otherConstants.requestDenied);
    }
  }
);

export const fetchHotelWithRooms = createAsyncThunk(
  "hotel/fetchHotelWithRooms",
  async (values) => {
    try {
      const result = await axiosInstance.post(
        otherConstants.fetchRoomsPath,
        values
      );
      return result.data.data;
    } catch (err) {
      throw new Error(otherConstants.requestDenied);
    }
  }
);

export const hotelSlice = createSlice({
  name: otherConstants.hotelState,
  initialState,
  reducers: {
    setFilterSearchSlice: (state, action) => {
      state.filteredSearch = action.payload;
    },
    setChildrenReducer: (state, action) => {
      state.children = action.payload;
    },
    updateSearchText: (state, action) => {
      state.filteredSearch.searchText = action.payload.text;
    },
    updateAdults: (state, action) => {
      state.filteredSearch.adults += 1;
    },
    updateRooms: (state, action) => {
      state.filteredSearch.rooms += 1;
    },
    updateAppliedFilters: (state, action) => {
      enableFilterCheck(state, action);
    },
    setHotelSelected: (state, action) => {
      state.hotelSelected.push(action.payload);
    },
    setStayDates: (state, action) => {
      state.stayStartDay = action.payload.start;
      state.stayEndDay = action.payload.end;
    },
  },
  extraReducers: {
    [fetchAllHotels.pending]: (state) => {
      state.status = otherConstants.loadingState;
    },
    [fetchAllHotels.fulfilled]: (state, action) => {
      state.status = otherConstants.successStatus;
      state.hotels = action.payload;
    },
    [fetchAllHotels.rejected]: (state, action) => {
      state.status = otherConstants.failedStatus;
      state.error = action.payload;
    },
    [filterHotels.pending]: (state) => {
      state.status = otherConstants.loadingState;
    },
    [filterHotels.fulfilled]: (state, action) => {
      state.status = otherConstants.successStatus;
      if (state.filtersEnabled) {
        state.hotels = action.payload;
      }
    },
    [filterHotels.rejected]: (state, action) => {
      state.status = otherConstants.failedStatus;
      state.error = action.payload;
    },

    [fetchHotelWithRooms.pending]: (state) => {
      state.status = otherConstants.loadingState;
    },
    [fetchHotelWithRooms.fulfilled]: (state, action) => {
      state.status = otherConstants.successStatus;
      state.hotelWithRooms = action.payload;
    },
    [fetchHotelWithRooms.rejected]: (state, action) => {
      state.status = otherConstants.failedStatus;
      state.error = action.payload;
    },

    [fetchHotelReviews.pending]: (state) => {
      state.status = otherConstants.loadingState;
    },
    [fetchHotelReviews.fulfilled]: (state, action) => {
      state.status = otherConstants.successStatus;
      state.currentHotelReviews = action.payload;
    },
    [fetchHotelReviews.rejected]: (state, action) => {
      state.status = otherConstants.failedStatus;
      state.error = action.payload;
    },

    [createBooking.pending]: (state) => {
      state.bookingStatus = otherConstants.loadingState;
    },
    [createBooking.fulfilled]: (state, action) => {
      state.bookingStatus = otherConstants.successStatus;
      state.bookingsMade = action.payload;
    },
    [createBooking.rejected]: (state, action) => {
      state.bookingStatus = otherConstants.failedStatus;
      state.error = action.payload;
    },
  },
});

export const {
  setFilterSearchSlice,
  setChildrenReducer,
  updateAdults,
  updateRooms,
  updateSearchText,
  updateAppliedFilters,
  setHotelSelected,
  setStayDates,
} = hotelSlice.actions;

export default hotelSlice.reducer;
