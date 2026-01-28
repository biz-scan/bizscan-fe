import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import AnalysisPage from '@/pages/AnalysisPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, 
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard', 
        element: <DashboardPage />,
      },
      {
        path: 'analysis',
        element: <AnalysisPage />,
      }
    ],
  },
]);