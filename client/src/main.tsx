import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import HomeLayout from './screens/_root/home-layout';
import {Home} from '@/screens/_root/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
