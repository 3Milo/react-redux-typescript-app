import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gridReducer from '../features/grid/gridSlice';
import infoReducer from '../features/info/infoSlice';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
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
