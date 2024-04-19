import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@/components/MenuIcon/MenuIcon';

const DashboardPage: React.FC = () => {
	return (
		<>
			<div className='relative flex justify-center items-center w-[1440px] h-[1024px] bg-aware-pattern'>
				<Link to='/'>
					<figure className='w-36 h-14 absolute top-6 right-6 z-10'>
						<img
							src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713282432/Group_1000004231logo-min_fvzzlq.png'
							alt='logo'
						/>
					</figure>
				</Link>
				<div className='absolute space-x-2  flex z-10'>
					<div className=' block'>
						<MenuIcon />
					</div>
					<main className='flex'>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
