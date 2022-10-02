import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

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

export const loadBooks = createAsyncThunk(
  '@@books/loadBooks',
  async (args, { rejectWithValue }) => {
    try {
      const res = await api.loadBooks(args);

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

    // LoadBooks
    [loadBooks.pending]: helpers.setLoading,
    [loadBooks.rejected]: helpers.setError,
    [loadBooks.fulfilled]: (state, action) => {
      const { items, totalItems } = action.payload;
      // const result = _.uniqBy(_.flatMap(items, 'volumeInfo'), 'title');
      // console.log('uniq items by TITLE: ', result);

      const data = _.uniqBy(items, 'id');
      // console.log('uniq items by ID: ', data);
      state.status = 'received';
      state.list = data;
      state.totalItems = totalItems;
    },


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

