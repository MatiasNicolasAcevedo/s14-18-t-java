import { Link } from 'react-router-dom';

export function NavBar() {
	return (
		<div className='w-full bg-teal-600 bg-opacity-20 border border-zinc-500 backdrop-blur-xl sticky top-0 left-0'>
			<nav className='container mx-auto p-4 flex justify-between items-center relative top-0'>
				{/* Links a la izquierda */}
				<div className='w-96 h-6 justify-start items-center gap-8 inline-flex'>
					<div className='flex-col justify-center items-start inline-flex'>
						<div className="text-center text-gray-900 text-base font-normal font-['Nunito'] leading-normal">
							Home
						</div>
					</div>
					<div className='flex-col justify-center items-start inline-flex'>
						<div className="text-center text-gray-900 text-base font-normal font-['Nunito'] leading-normal">
							Foro
						</div>
					</div>
					<div className='flex-col justify-center items-start inline-flex'>
						<div className="text-center text-gray-900 text-base font-normal font-['Nunito'] leading-normal">
							Juegos
						</div>
					</div>
					<div className='flex-col justify-center items-start inline-flex'>
						<div className="text-center text-gray-900 text-base font-normal font-['Nunito'] leading-normal">
							Contacto
						</div>
					</div>
					<div />
				</div>

				{/* Logo en el centro */}
				<div className='flex flex-shrink-0 items-center'>
					<img
						className=' h-16 w-36'
						src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713282432/Group_1000004231logo-min_fvzzlq.png'
						alt='Your Company'
					/>
				</div>

				{/* Botones a la derecha */}
				<div className='flex items-center gap-8'>
					<div className='bg-white w-36 h-12 px-7 py-3 rounded-3xl text-black text-sm font-normal leading-tight shadow-custom'>
						<div className='flex flex-col items-center'>
							<Link to={'/login'}>Iniciar sesión</Link>
						</div>
					</div>
					<div className="text-black text-sm font-normal font-['Nunito'] leading-tight">
						<Link to='/register'>Registrarse</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
