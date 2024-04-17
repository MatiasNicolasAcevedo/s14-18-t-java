import React, { useEffect, useRef } from 'react';
import livingroom from '../images/livingroom.png';
import { NavBar } from '@/components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import { Footer } from '@/components';
const LandingPage: React.FC = () => {
	// Función para manejar el scroll suave
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const div = divRef.current;
		const handleScroll = (e: WheelEvent) => {
			e.preventDefault();
			if (div) {
				const containerScrollPosition = div.scrollLeft;
				div.scrollTo({
					top: 0,
					left: containerScrollPosition + e.deltaY,
					behavior: 'smooth',
				});
			}
		};

		div?.addEventListener('wheel', handleScroll, { passive: false });

		return () => {
			div?.removeEventListener('wheel', handleScroll);
		};
	}, []);

	return (
		<div className='w-full bg-gradient-to-b from-white to-custom-purple'>
			<NavBar />
			<div
				ref={divRef}
				className='max-w-7xl mx-auto py-28 items-center justify-center'
			>
				<div className='hero flex gap-12'>
					<div className=' w-6/12 hero-content flex-col'>
						<h1 className=' text-xl text-black font-bold'>Aware Gaming</h1>
						<p className=' text-black text-base'>
							Bienvenido a nuestra plataforma de juegos, donde creemos en el
							juego responsable. Únete a esta experiencia y aprende acerca de la
							importancia divertirse conscientemente
						</p>
						<div className='bg-white w-36 h-12 px-7 py-3 rounded-3xl text-black text-sm font-semibold text-center leading-tight shadow-custom'>
							<Link to={'/login'}>Jugar</Link>
						</div>
					</div>
					<div className='w-6/12 bg-black bg-opacity-20 rounded-full shadow shadow-inner'>
						<img
							className=' rounded-10p max-w-custom'
							src={livingroom}
							alt='living room'
						/>
					</div>
				</div>
			</div>
			{/* LANDING 2, 3...*/}
			<Footer />
		</div>
	);
};

export default LandingPage;
