import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@/components/MenuIcon/MenuIcon';

const DashboardPage: React.FC = () => {
	return (
		<>
			<div className=' flex flex-col justify-around items-center w-full bg-aware-pattern min-h-screen bg-cover pb-20'>
				<div className=' w-11/12 flex justify-end '>
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
