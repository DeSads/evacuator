import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);