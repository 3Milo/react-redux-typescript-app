import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { fetchUsers } from './gridAPI';

export enum GridStatus {
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

export interface GridState {
  users: UserData[];
  status: GridStatus
}

const initialState: GridState = {
  users: [],
  status: GridStatus.Idle,
};

export const downloadUsers = createAsyncThunk(
  'grid/fetchUsers',
  async (amount: number) => {
    const response = await fetchUsers(amount);
    // The returned value becomes the `fulfilled` action payload
    return response;
  }
);

const gridSlice = createSlice({
  name: 'grid',
  initialState: {
    users: [],
    status: GridStatus.Idle
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadUsers.pending, (state) => {
        state.status = GridStatus.Loading;
      })
      .addCase(downloadUsers.fulfilled, (state, action) => {
        state.status = GridStatus.Idle;
        state.users = action.payload;
      })
      .addCase(downloadUsers.rejected, (state) => {
        state.status = GridStatus.Failed;
      });
  },
})

export const selectGridUsers = (state: RootState) => state.grid.users;
export const selectGridStatus = (state: RootState) => state.grid.status;

export default gridSlice.reducer;
