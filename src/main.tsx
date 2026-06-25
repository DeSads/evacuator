import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { getServiceBySlug } from './api/services';
import ServicesPage from './pages/ServicesPage';
import { getServices } from './api/services';
import './index.css';

// Создаём роутер
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'services',
        element: <ServicesPage />,
        loader: getServices, // здесь мы указываем функцию, которая вернёт данные
      },
      // другие маршруты (главная, контакты) добавим позже
    ],
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