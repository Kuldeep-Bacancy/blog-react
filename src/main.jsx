import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Login from './components/pages/Login.jsx'
import Home from './components/pages/Home.jsx'
import Signup from './components/pages/Signup.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <RouterProvider router={router} />
  </Provider>,
)
