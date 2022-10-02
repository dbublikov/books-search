import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  category: 'all',
  orderBy: 'relevance',
};

const controlsSlice = createSlice({
  name: '@@controls',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    clearControls: () => initialState,
  },
});

export const { setCategory, setOrderBy, setSearch, clearControls } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

// selectors
export const selectControls = (state) => state.controls;
export const selectSearch = (state) => state.controls.search;
export const selectCategory = (state) => state.controls.category;
export const selectOrderBy = (state) => state.controls.orderBy;
