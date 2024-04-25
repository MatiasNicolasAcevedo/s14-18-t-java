import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import MenuIcon from '@/components/MenuIcon/MenuIcon';
import { useAuth, useRoullete } from '@/hooks';

const DashboardPage: React.FC = () => {
	const [background, setBackground] = useState('');
	const location = useLocation();
	const { roullete } = useRoullete();
	const { getProfile } = useAuth();

	useEffect(() => {
		getProfile();
	}, []);

	useEffect(() => {
		if (location.pathname === '/dashboard') setBackground('bg-aware-pattern');
		else if (
			location.pathname === '/dashboard/profile' ||
			location.pathname === '/dashboard/foro'
		)
			setBackground('bg-aware-pattern');
		else if (
			location.pathname === '/dashboard/roullete' &&
			roullete.result === ''
		)
			setBackground('bg-roulette-dashboard');
		else if (
			location.pathname === '/dashboard/roullete' &&
			roullete.result === 'WIN'
		)
			setBackground('bg-roulette-win');
		else if (
			location.pathname === '/dashboard/roullete' &&
			roullete.result === 'LOSE'
		)
			setBackground('bg-roulette-lose');
	}, [location.pathname, roullete]);

	return (
		<>
			<div
				className={`flex flex-col justify-around items-center w-full ${background} min-h-screen bg-cover pb-20`}
			>
				<div className='w-full flex bg-white flex-col justify-center items-center py-2 my-7'>
					<Link to='/'>
						<figure className='w-36 h-14 top-6 right-6 z-10'>
							<img
								src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713282432/Group_1000004231logo-min_fvzzlq.png'
								alt='logo'
							/>
						</figure>
					</Link>
				</div>
				<div className=' space-x-2  flex z-10'>
					<div className=' block'>
						<MenuIcon />
					</div>
					<main className='flex space-x-2'>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
