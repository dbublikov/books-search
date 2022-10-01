import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../config';

export const loadBookById = createAsyncThunk(
  '@@details/loadBookById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.loadDetails(id);

      return res.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentBook: null,
  status: 'idle',
  error: null,
};

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
    getDetails: (state, action) => {
      state.currentBook = JSON.parse(localStorage.getItem(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBookById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBookById.fulfilled, (state, { payload }) => {
        state.status = 'received';
        state.currentBook = payload;
        const id = payload.id;
        localStorage.setItem(id, JSON.stringify(payload));
      })

      .addCase(loadBookById.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      });
  },
});

export const { clearDetails, getDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

// selectors
export const selectCurrentBook = state => state.details.currentBook;
export const selectDetails = state => state.details;
