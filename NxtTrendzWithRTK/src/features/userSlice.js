const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
