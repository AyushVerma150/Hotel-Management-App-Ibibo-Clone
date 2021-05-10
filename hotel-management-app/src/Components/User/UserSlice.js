import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import errorConstants from "Constants/Error";

let token, errorMsg, userInfo;

const initialState = {
  currentUser: null,
  status: "idle",
  currentUserReviews: [],
  error: null,
  token: "",
};

export const userLoginResponse = createAsyncThunk(
  "users/userLoginResponse",
  async (values) => {
    const response = await axios.post(
      "http://localhost:8080/user/login",
      values
    );
    if (response.data.message) {
      errorMsg = response.data.message;
      throw Error(response.data.message);
    }
    token = response.data.data[1];
    userInfo = response.data.data[0];
    return response.data.data;
  }
);

export const userSignUpResponse = createAsyncThunk(
  "users/userSignUpResponse",
  async (values) => {
    alert(JSON.stringify(values));
    const result = await axios.post(
      "http://localhost:8080/user/register",
      values
    );
    if (result.data.message) {
      errorMsg = result.data.message;
      throw Error(result.data.message);
    }
    return result.data.data;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [userLoginResponse.fulfilled]: (state, action) => {
      state.status = "success";
      state.token = action.payload;
      state.currentUser = userInfo;
    },
    [userLoginResponse.rejected]: (state) => {
      state.status = errorConstants.errorState;
      state.error = errorMsg;
    },
    [userLoginResponse.pending]: (state) => {
      state.status = "loading";
    },
    [userSignUpResponse.pending]: (state) => {
      state.status = "loading";
    },
    [userSignUpResponse.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
    },
    [userSignUpResponse.rejected]: (state, action) => {
      state.status = "failed";
      state.error = errorMsg;
    },
  },
});
export const {} = loginSlice.actions;

export default loginSlice.reducer;
