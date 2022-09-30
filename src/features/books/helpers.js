// Helpers
export const setLoading = (state) => {
  state.status = 'loading';
  state.error = null;
};

export const setPageLoading = (state) => {
  state.pagination.status = 'loading';
  state.pagination.error = null;
};

export const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload || action.meta.error;
  state.totalItems = null;
};

export const setReceived = (state, action) => {
  const { items, totalItems } = action.payload;

  state.status = 'received';
  state.list = items;
  state.totalItems = totalItems;
};
