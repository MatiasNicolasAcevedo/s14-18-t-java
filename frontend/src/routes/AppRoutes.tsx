import { Navigate, useRoutes } from 'react-router-dom';
import { RegisterPage, RoulletePage } from '@/pages';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import ForoMain from '@/pages/ForoMain';
import Post from '@/pages/Post';
import { Posts } from '@/components/Posts/Posts';
import { useAuth } from '@/hooks';

export const AppRoutes = () => {
	const { isSignin } = useAuth();

	const routes = [
		{
			path: '/register',
			element: !isSignin ? (
				<RegisterPage />
			) : (
				<Navigate
					replace
					to='/dashboard/profile'
				/>
			),
		},
		{
			path: '/',
			element: !isSignin ? (
				<LandingPage />
			) : (
				<Navigate
					replace
					to='/dashboard/profile'
				/>
			),
		},
		{
			path: '/login',
			element: !isSignin ? (
				<LoginPage />
			) : (
				<Navigate
					replace
					to='/dashboard/profile'
				/>
			),
		},
		{
			path: '/dashboard',
			element: isSignin ? (
				<DashboardPage />
			) : (
				<Navigate
					replace
					to='/login'
				/>
			),
			children: [
				{
					path: '',
					redirect: 'profile',
					pathmatch: 'full',
				},
				{
					path: 'profile',
					element: isSignin ? (
						<ProfilePage />
					) : (
						<Navigate
							replace
							to='/login'
						/>
					),
				},
				{
					path: 'roullete',
					element: isSignin ? (
						<RoulletePage />
					) : (
						<Navigate
							replace
							to='/login'
						/>
					),
				},
				{
					path: 'foro',
					element: isSignin ? (
						<ForoMain />
					) : (
						<Navigate
							replace
							to='/login'
						/>
					),
					children: [
						{
							path: '',
							element: isSignin ? (
								<Posts />
							) : (
								<Navigate
									replace
									to='/login'
								/>
							),
						},
						{
							path: 'post',
							element: isSignin ? (
								<Post />
							) : (
								<Navigate
									replace
									to='/login'
								/>
							),
						},
					],
				},
			],
		},
	];

	return useRoutes(routes);
};
