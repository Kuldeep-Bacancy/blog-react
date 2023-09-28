import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../services/auth'
import { logout } from '../../store/authSlice'

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout()
    .then(() => dispatch(logout()))
    .catch((err) => console.log(err))
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClickCapture={logoutHandler}>
      Logout
    </button>
  )
}

export default Logout