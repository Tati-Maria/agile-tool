import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'sonner';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { store } from '@/store/index.ts';
import { Provider } from 'react-redux';
import HomeLayout from '@/screens/_root/home-layout';
import { Home } from '@/screens/_root/pages';
import AuthLayout from '@/screens/_auth/auth-layout.tsx';
import { ProtectedPages } from '@/components/shared/private-route';
import { ForgotPassword, Login, Register } from '@/screens/_auth/pages';
import ProjectLayout from '@/screens/_projects/project-layout.tsx';
import {
  ProjectPage,
  ProjectIdLayout,
  ProjectsPage,
  UpdateProjectPage,
} from '@/screens/_projects/pages';
import NotFound from '@/errors/not-found.tsx';
import ErrorLog from './errors/error-page.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="" element={<ProtectedPages />}>
        <Route path="" element={<ProjectLayout />}>
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" errorElement={<ErrorLog />} element={<ProjectIdLayout />}>
            <Route index element={<ProjectPage />} />
            <Route path="projects/:projectId/update" element={<UpdateProjectPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
