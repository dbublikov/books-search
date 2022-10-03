import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { controlsReducer } from './features/controls/controls-slice';
import { detailsReducer } from './features/details/details-slice';
import { booksReducer } from './features/books/books-slice';

const reducer = {
  books: booksReducer,
  controls: controlsReducer,
  details: detailsReducer,
};

export function getStoreWithState(preloadedState) {
  return configureStore({ reducer, preloadedState });
}

export function renderWithContext(element, state) {
  const store = getStoreWithState(state);
  const utils = render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>
  );
  return { store, ...utils };
}

export const getPreloadedState = () => {
  const state = {
    books: {
      status: 'idle',
      error: null,
      totalItems: null,
      list: [],
      pagination: {
        status: 'idle',
        error: null,
        currIndex: 2,
        pageTerm: 'placeholder',
        step: 2,
      },
    },
  };
  return state;
};
