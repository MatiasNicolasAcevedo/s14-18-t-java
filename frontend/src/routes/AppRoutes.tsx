import { useRoutes } from 'react-router-dom';
import { RegisterPage, RoulletePage } from '@/pages';
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
		{
			path: '/roullete',
			element: <RoulletePage />,
		},
	];

	return useRoutes(routes);
};
