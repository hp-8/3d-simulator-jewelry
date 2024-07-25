import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import filterReducer from './reducers/filterReducer';
import sortReducer from './reducers/sortReducer';
import paginationReducer from './reducers/paginationReducer';
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';
import addressReducer from './reducers/addressReducer';
import configurationReducer from './reducers/configurationReducer';

const rootReducer = {
  // Reducers
  user:userReducer,
  order:orderReducer,
  address:addressReducer,

  cart: cartReducer,
  filter: filterReducer,
  sort: sortReducer,
  paginate: paginationReducer,
  configurations: configurationReducer

};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
