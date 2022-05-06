import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersListReducer from '../features/usersList/usersListSlice';
import userInfoReducer from '../features/userInfo/userInfoSlice';

export const store = configureStore({
  reducer: {
    usersList: usersListReducer,
    userInfo: userInfoReducer
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
