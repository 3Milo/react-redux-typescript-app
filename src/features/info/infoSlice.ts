import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchInfo } from './infoAPI';

export enum InfoStatus {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

export interface Info {
  avatar_url: string,
  name: string,
  followers: number,
  following: number,
  created_at: string,
  company: string,
  email: string,
  location: string,
  blog: string,
  bio: string
}

export interface InfoState {
  data: Info;
  status: InfoStatus
}

const initialState: InfoState = {
  data: {} as Info,
  status: InfoStatus.Idle
};

export const downloadInfo = createAsyncThunk(
  'user/fetchInfo',
  async (login: string) => {
    const response = await fetchInfo(login);
    // The returned value becomes the `fulfilled` action payload
    return response;
  }
);

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadInfo.pending, (state) => {
        state.status = InfoStatus.Loading;
      })
      .addCase(downloadInfo.fulfilled, (state, action) => {
        state.status = InfoStatus.Idle;
        state.data = action.payload;
      })
      .addCase(downloadInfo.rejected, (state) => {
        state.status = InfoStatus.Failed;
      });
  },
})

export const selectInfoData = (state: RootState): Info => state.info.data;
export const selectInfoStatus = (state: RootState): InfoStatus => state.info.status;

export default infoSlice.reducer;
