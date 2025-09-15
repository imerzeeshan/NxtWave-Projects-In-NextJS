import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
};

export const addressSlice = createSlice({
  name: "addressSlice",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
  },
});

export const { setAddresses } = addressSlice.actions;
export default addressSlice.reducer;
