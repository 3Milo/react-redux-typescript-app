import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUserInfo } from './userInfoAPI';

export enum UserInfoStatus {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

export interface UserInfo {
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
  data: UserInfo;
  status: UserInfoStatus
}

const initialState: InfoState = {
  data: {} as UserInfo,
  status: UserInfoStatus.Idle
};

export const downloadInfo = createAsyncThunk(
  'userInfo/fetchInfo',
  async (login: string) => {
    const response = await fetchUserInfo(login);
    // The returned value becomes the `fulfilled` action payload
    return response;
  }
);

const infoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadInfo.pending, (state) => {
        state.status = UserInfoStatus.Loading;
      })
      .addCase(downloadInfo.fulfilled, (state, action) => {
        state.status = UserInfoStatus.Idle;
        state.data = action.payload;
      })
      .addCase(downloadInfo.rejected, (state) => {
        state.status = UserInfoStatus.Failed;
      });
  },
})

export const selectUserInfoData = (state: RootState): UserInfo => state.userInfo.data;
export const selectUserInfoStatus = (state: RootState): UserInfoStatus => state.userInfo.status;

export default infoSlice.reducer;
