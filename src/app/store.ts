import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersListReducer from '../features/usersList/usersListSlice';
import infoReducer from '../features/info/infoSlice';

export const store = configureStore({
  reducer: {
    usersList: usersListReducer,
    info: infoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
