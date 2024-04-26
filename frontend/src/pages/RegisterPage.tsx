import { RegisterForm } from '@/components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function RegisterPage() {
	const [background, setBackground] = useState('');
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/login' || location.pathname === '/register') {
			setBackground('bg-login-register');
		}
	}, [location.pathname]);

	return (
		<>
			<div
				className={`flex justify-center relative items-center w-screen min-h-screen ${background} bg-cover bg-center bg-fixed pb-20 overflow-auto`}
			>
				<img
					className=' absolute w-[1025.59px] h-[1000px] origin-top-left left-0 top-10 rotate-[1.16deg]'
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
						<RegisterForm />
					</section>
				</div>
			</div>
		</>
	);
}
