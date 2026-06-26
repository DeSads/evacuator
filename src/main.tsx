import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { getServiceBySlug } from './api/services';
import HomePage from './pages/HomePage';
import { getPageBySlug } from './api/pages';
import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: async () => {
      const page = await getPageBySlug('home');
      return page;
    },
  },
  {
    path: 'services/:slug',
    element: <ServiceDetailPage />,
    loader: async ({ params }) => {
      if (!params.slug) throw new Error('Slug не указан');
      return getServiceBySlug(params.slug);
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);