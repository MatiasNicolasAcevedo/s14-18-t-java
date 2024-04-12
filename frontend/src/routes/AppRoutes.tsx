import { useRoutes } from 'react-router-dom';
import RegisterPage from '@/pages/RegisterPage';
import LandingPage from '@/pages/LandingPage';

export const AppRoutes = () => {
  const routes = [
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      element: <LandingPage />,
    }
  ];

  return useRoutes(routes);
};
