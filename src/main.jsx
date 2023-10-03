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
import AllArticles from './components/pages/AllArticles.jsx'
import AddArticle from './components/pages/AddArticle.jsx'
import EditArticle from './components/pages/EditArticle.jsx'
import Article from './components/pages/Article.jsx'
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/all-articles' element={
        <AuthLayout>
          <AllArticles />
        </AuthLayout>
      } />
      <Route path='/add-article' element={
        <AuthLayout>
          <AddArticle />
        </AuthLayout>
      } />
      <Route path='/edit-article/:id' element={
        <AuthLayout>
          <EditArticle />
        </AuthLayout>
      } />
      <Route path='/article/:id' element={
        <AuthLayout>
        <Article />
        </AuthLayout>
      } />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <RouterProvider router={router} />
  </Provider>,
)
