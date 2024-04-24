import { useRoutes } from 'react-router-dom';
import { RegisterPage, RoulletePage } from '@/pages';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import ForoMain from '@/pages/ForoMain';
import Post from '@/pages/Post';
import { Posts } from '@/components/Posts/Posts';

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
			path: '/dashboard',
			element: <DashboardPage />,
			children: [
				{
					path: '',
					redirect: 'profile',
					pathmatch: 'full',
				},
				{
					path: 'profile',
					element: <ProfilePage />,
				},
				{
					path: 'roullete',
					element: <RoulletePage />,
				},
				{
					path: 'foro',
					element: <ForoMain />,
					children: [
						{
							path: '',
							element: <Posts />,
						},
						{
							path: 'post',
							element: <Post />,
						},
					],
				},
			],
		},
	];

	return useRoutes(routes);
};
