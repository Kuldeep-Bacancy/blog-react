import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../services/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async() => {
    const response = await authService.logout()
    
    if(response.status_code === 200){
      dispatch(logout())
      navigate("/login")
      toast.success('Logout Successfully!', { autoClose: 3000 })
    }
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClickCapture={logoutHandler}>
      Logout
    </button>
  )
}

export default Logout