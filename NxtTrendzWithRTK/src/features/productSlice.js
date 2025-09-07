const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  products: [],
  filteredProducts: [],
  sortBy: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setProducts, setFilteredProducts, setSortBy } =
  productSlice.actions;
export default productSlice.reducer;
