import { useRoutes } from 'react-router-dom';
import { RegisterPage } from '@/pages/RegisterPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';

export const AppRoutes = () => {
	const routes = [
		{
			path: '/register',
			element: <RegisterPage />,
		},
		{
			path: '/',
			element: <LandingPage />,
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
	];

	return useRoutes(routes);
};
