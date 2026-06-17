import { configureStore } from '@reduxjs/toolkit';
import configurationReducer from './reducers/configurationReducer';

const store = configureStore({
  reducer: {
    configurations: configurationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
