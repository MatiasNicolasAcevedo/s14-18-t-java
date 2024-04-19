import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
	return (
		<>
			<Link to='/'>
				<figure className='w-36 h-14 absolute top-6 left-14 z-10'>
					<img
						src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713282432/Group_1000004231logo-min_fvzzlq.png'
						alt='logo'
					/>
				</figure>
			</Link>

			<figure className='w-full h-[1220px]'>
				<img
					className='w-full h-full bg-cover'
					src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713281906/Registro_DT_Dk_3_-min_dome3p.png'
					alt='fondo'
				/>
				<section className='flex flex-col items-end pr-32 absolute top-0 right-0'>
					<LoginForm />
				</section>
			</figure>
		</>
	);
};

export default LoginPage;
