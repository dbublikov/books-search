import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../config';
import * as helpers from './helpers';

export const initLoad = createAsyncThunk(
  '@@books/initLoad',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.initLoad();
      // console.log(res)
      return res.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  status: 'idle', // 'loading', 'received', 'rejected'
  error: null,
  totalItems: null,
  list: [],
};

// Slice definition
const booksSlice = createSlice({
  name: '@@books',
  initialState,
  reducers: {

  },
  extraReducers: {
    // InitLoad
    [initLoad.pending]: helpers.setLoading,
    [initLoad.rejected]: helpers.setError,
    [initLoad.fulfilled]: helpers.setReceived,
  },
});

export const booksReducer = booksSlice.reducer;

export const selectBooks = (state) => state.books.list;

export const selectBooksInfo = (state) => {
  return {
    status: state.books.status,
    error: state.books.error,
    qty: state.books.totalItems,
  };
};

