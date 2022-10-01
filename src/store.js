import { configureStore } from '@reduxjs/toolkit';

import { booksReducer } from './features/books/books-slice';
import { detailsReducer } from './features/details/details-slice';


const store = configureStore({
  reducer: {
    books: booksReducer,
    details: detailsReducer,
  },
});

export default store;
