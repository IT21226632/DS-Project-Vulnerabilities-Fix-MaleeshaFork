import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  user_id: null,
  roles: null,
  profile_picture: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.user_id = action.payload.user_id;
      state.roles = action.payload.roles;
      state.profile_picture = action.payload.profile_picture;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.user_id = null;
      state.roles = null;
      state.profile_picture = null;
    },
    extendSession: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { login, logout, extendSession } = userSlice.actions;

export default userSlice.reducer;
