import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { fetchUsers } from './usersListAPI';

export enum UsersListStatus {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

export interface UserData {
  avatar_url: string,
  events_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  gravatar_id: string,
  html_url: string,
  id: number,
  login: string,
  node_id: string,
  organizations_url: string,
  received_events_url: string,
  repos_url: string,
  site_admin: boolean,
  starred_url: string,
  subscriptions_url: string,
  type: string,
  url: string,
}

export interface UsersListState {
  users: UserData[];
  status: UsersListStatus
}

const initialState: UsersListState = {
  users: [],
  status: UsersListStatus.Idle,
};

export const downloadUsers = createAsyncThunk(
  'usersList/fetchUsers',
  async (amount: number) => {
    const response = await fetchUsers(amount);
    // The returned value becomes the `fulfilled` action payload
    return response;
  }
);

const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadUsers.pending, (state) => {
        state.status = UsersListStatus.Loading;
      })
      .addCase(downloadUsers.fulfilled, (state, action) => {
        state.status = UsersListStatus.Idle;
        state.users = action.payload;
      })
      .addCase(downloadUsers.rejected, (state) => {
        state.status = UsersListStatus.Failed;
      });
  },
})

export const selectUsersListUsers = (state: RootState) => state.usersList.users;
export const selectUsersListStatus = (state: RootState) => state.usersList.status;

export default usersListSlice.reducer;
