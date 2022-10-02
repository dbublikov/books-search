import { configureStore } from '@reduxjs/toolkit';

import { controlsReducer } from './features/controls/controls-slice';
import { booksReducer } from './features/books/books-slice';
import { detailsReducer } from './features/details/details-slice';


const store = configureStore({
  reducer: {
    books: booksReducer,
    controls: controlsReducer,
    details: detailsReducer,
  },
});

export default store;
