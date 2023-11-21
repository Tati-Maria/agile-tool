import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import HomeLayout from './screens/_root/home-layout';
import {Home} from '@/screens/_root/pages';
import AuthLayout from './screens/_auth/auth-layout.tsx';
import {ForgotPassword, Login, Register} from '@/screens/_auth/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
