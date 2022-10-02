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
  async (args, { getState, dispatch, rejectWithValue }) => {
    try {
      const { search } = getState().controls;
      const res = await api.loadBooks(args);

      dispatch(setPageTerm(search));
      return res.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadMore = createAsyncThunk(
  '@@books/loadMore',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currIndex, pageTerm }= getState().books.pagination;
      const { category, orderBy } = getState().controls;
      const search = pageTerm;
      const res = await api.loadBooks({ search, category, orderBy }, currIndex);

      // console.log(res.data);

      return res.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paginationState = {
  status: 'idle',
  error: null,
  currIndex: null,
  pageTerm: '',
  step: 30,
};

const initialState = {
  status: 'idle', // 'loading', 'received', 'rejected'
  error: null,
  totalItems: null,
  list: [],
  pagination: paginationState,
};

// Slice definition
const booksSlice = createSlice({
  name: '@@books',
  initialState,
  reducers: {
    setPageTerm: (state, action) => {
      state.pagination.pageTerm = action.payload;
    },
    clearPagination: (state, action) => {
      state.pagination = paginationState;
    },
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
      state.pagination.currIndex = state.pagination.step;
    },

    // LoadMore
    [loadMore.pending]: helpers.setPageLoading,
    [loadMore.rejected]: (state, action) => {
      state.pagination.status = 'rejected';
      state.pagination.error = action.payload || action.meta.error;
    },
    [loadMore.fulfilled]: (state, action) => {
      // console.log('action.payload.data.items: ', action.payload.items)
      const data = action.payload.items;
      state.list = _.uniqBy([...state.list, ...data], 'id');

      state.pagination.status = 'received';
      state.pagination.currIndex += state.pagination.step;
    },
  },
});

export const { setPageTerm, clearPagination } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;

export const selectBooks = (state) => state.books.list;
export const selectBooksInfo = (state) => {
  return {
    status: state.books.status,
    error: state.books.error,
    qty: state.books.totalItems,
    pagination: state.books.pagination,
  };
};

