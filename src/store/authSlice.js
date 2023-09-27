import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLoggedin: false,
  userData: {}
}

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token,
      state.isLoggedin = true
      state.userData = action.payload
    },
    logout: (state) => {
      state.token = "",
      state.isLoggedin = false
      state.userData = {}
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;