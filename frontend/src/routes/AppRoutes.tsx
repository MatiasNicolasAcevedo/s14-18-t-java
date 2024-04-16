import { useRoutes } from 'react-router-dom';
import { RegisterPage } from '@/pages/RegisterPage';

export const AppRoutes = () => {
	const routes = [
		{
			path: '/register',
			element: <RegisterPage />,
		},
	];

	return useRoutes(routes);
};
