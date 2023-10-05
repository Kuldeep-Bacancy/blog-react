import React, { useState } from 'react'
import authService from '../../services/auth'
import { login as authLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { Button, Input, Logo } from "../index"
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage'
import Loader from "../Loader";
import { toast } from 'react-toastify';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [error, setError] = useState('')


  const loginHandler = async (data) => {
    setIsLoading(true)
    try {
      const { email, password } = data
      const response = await authService.login(email, password)

      if (response.status_code === 200) {
        setIsLoading(false)
        dispatch(authLogin(response.data))
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/")
        toast.success('Login Successfully!', { autoClose: 3000 })
      } else {
        setIsLoading(false)
        setError(response.message)
        toast.error(response.message, { autoClose: 3000 })
      }
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
      toast.error(error.message, { autoClose: 3000 })
    }


  }

  return (
    <div
      className='flex items-center justify-center w-full'
    >
      { isLoading && <Loader/> }
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(loginHandler)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required!",
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <ErrorMessage message={errors.email?.message}/>
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required!"
              })}
            />
            <ErrorMessage message={errors.password?.message} />
            <Button
              type="submit"
              className="w-full"
            >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login