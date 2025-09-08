import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, loggedIn } = action.payload;
      state.user = user;
      state.token = token;
      state.loggedIn = loggedIn;
    },
    updateCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { setCredentials, clearCredentials, updateCredentials } =
  authSlice.actions;
export default authSlice.reducer;
