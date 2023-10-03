import { createSlice } from "@reduxjs/toolkit";
import jwt from 'jwt-decode'

const userToken = localStorage.getItem('token')

const initialState = {
  token: userToken,
  isLoggedin: userToken ? true : false,
  userData: userToken ? jwt(userToken) : {}
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