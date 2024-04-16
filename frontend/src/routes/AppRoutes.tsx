import { useRoutes } from 'react-router-dom';
import RegisterPage from '@/pages/RegisterPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SphereBackground from '@/components/SphereBackground/SphereBackground';

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
			element: (
				<SphereBackground sceneUrl='https://prod.spline.design/EFeqGVicdOkPVKR9/scene.splinecode'>
					<LoginPage />
				</SphereBackground>
			),
		},
	];

	return useRoutes(routes);
};
