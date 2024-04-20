import React, { useEffect, useRef } from 'react';
import { NavBar } from '@/components/NavBar/NavBar';
import { Footer } from '@/components';
import { ViewLanding4 } from './ViewsLanding/ViewLanding4';
import { ViewLanding1 } from './ViewsLanding/ViewLanding1';
import { ViewLanding2 } from './ViewsLanding/ViewLanding2';
import { ViewLanding3 } from './ViewsLanding/ViewLanding3';
import { ViewLanding5 } from './ViewsLanding/ViewLanding5';
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
		<div className='w-full bg-landing-p bg-no-repeat bg-cover'>
			<NavBar />
			<ViewLanding1 />
			<ViewLanding2 />
			<ViewLanding3 />
			<ViewLanding4 cards={[]} />
			<ViewLanding5 />
			<Footer />
		</div>
	);
};

export default LandingPage;
