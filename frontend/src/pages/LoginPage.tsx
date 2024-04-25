import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
	const [background, setBackground] = useState('');
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/Login' || location.pathname === '/register') {
			setBackground('bg-login-register');
		}
	}, [location.pathname]);
	return (
		<>
			<div
				className={`flex justify-center relative items-center w-screen h-screen ${background} bg-cover bg-center bg-fixed pb-20 `}
			>
				<img
					className='absolute w-full h-[550px] origin-top-left left-0 top-20 rotate-[.16deg]'
					src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713911970/Fichas_i9l8c6.svg'
					alt='fichas'
				/>
				<div className=' flex justify-end w-3/4 relative h-full p-30 '>
					<Link to='/'>
						<figure className='w-36 h-14  absolute top-10 left-0 z-10'>
							<img
								src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713282432/Group_1000004231logo-min_fvzzlq.png'
								alt='Logo para fondo claro'
							/>
						</figure>
					</Link>
					<section className='w-1/2 absolute top-0 right-0'>
						<LoginForm />
					</section>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
