import { RegisterForm } from '@/components';
import { Link } from 'react-router-dom';

export function RegisterPage() {
	return (
		<>
			<Link to='/'>
				<figure className='w-36 h-14 absolute top-6 left-14'>
					<img
						src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713222392/AwareGaming/logo_ed2n0h.png'
						alt='logo'
					/>
				</figure>
			</Link>
			<iframe
				// src='https://my.spline.design/untitledcopycopy-fe16648ef55af397ffd102b7f327c661/'
				width='100%'
				height='990px'
			></iframe>
			<section className='flex flex-col items-end pr-32 absolute top-0 right-0'>
				{/* <h1 className='text-3xl font-bold mb-4'>Registrarse</h1>
			<p className='w-19em h-3em overflow-hidden'> Bienvenido a Aware Gaming</p> */}
				<RegisterForm />
			</section>
		</>
	);
}
