import React, { useState } from 'react'
import authService from '../../services/auth'
import { useForm } from "react-hook-form"
import { Button, Input, Logo } from "../index"
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage'
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const signupHandler = async(data) => {
    try {
      const { email, password } = data;
      const response = await authService.register(email, password)

      if (response.status_code === 200) { 
        navigate('/login')
        toast.success('Signup Successfully!', { autoClose: 3000 })
      } else {
        setError(response.message)
      }
    } catch (error) {
      setError(error.message)
    }
    
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signupHandler)}>
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
                required: "Password is required!",
              })}
            />
            <ErrorMessage message={errors.password?.message} />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Signup