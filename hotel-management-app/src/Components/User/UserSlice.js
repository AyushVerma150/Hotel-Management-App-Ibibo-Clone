import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../AxiosConfig";
import errorConstants from "Constants/Error";
import otherConstants from "Constants/OtherConstants";

let token, errorMsg, userInfo;

const initialState = {
  currentUser: null,
  status: otherConstants.idleStatus,
  currentUserReviews: [],
  error: null,
  token: null,
};

export const userLoginResponse = createAsyncThunk(
  "users/userLoginResponse",
  async (values) => {
    try {
      const response = await axiosInstance.post(
        otherConstants.loginPath,
        values
      );
      if (response.data.message) {
        errorMsg = response.data.message;
        throw Error(response.data.message);
      }
      token = response.data.data[1];
      userInfo = response.data.data[0];
      return response.data.data;
    } catch (err) {
      throw new Error(otherConstants.requestDenied);
    }
  }
);

export const userSignUpResponse = createAsyncThunk(
  "users/userSignUpResponse",
  async (values) => {
    try {
      const result = await axiosInstance.post(
        otherConstants.signUpPath,
        values
      );
      if (result.data.message) {
        errorMsg = result.data.message;
        throw Error(result.data.message);
      }
      return result.data.data;
    } catch (err) {
      throw new Error(otherConstants.requestDenied);
    }
  }
);

export const loginSlice = createSlice({
  name: otherConstants.userState,
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = otherConstants.idleStatus;
    },
  },
  extraReducers: {
    [userLoginResponse.fulfilled]: (state, action) => {
      state.status = otherConstants.successStatus;
      state.token = token;
      state.currentUser = userInfo;
    },
    [userLoginResponse.rejected]: (state) => {
      state.status = errorConstants.errorState;
      state.error = errorMsg;
    },
    [userLoginResponse.pending]: (state) => {
      state.status = otherConstants.loadingState;
    },
    [userSignUpResponse.pending]: (state) => {
      state.status = otherConstants.loadingState;
    },
    [userSignUpResponse.fulfilled]: (state, action) => {
      state.status = otherConstants.successStatus;
      state.currentUser = action.payload;
    },
    [userSignUpResponse.rejected]: (state, action) => {
      state.status = otherConstants.failedStatus;
      state.error = errorMsg;
    },
  },
});
export const { setStatus } = loginSlice.actions;

export default loginSlice.reducer;
