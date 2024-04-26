import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import { Link } from 'react-router-dom';

interface SphereBackgroundProps {
	sceneUrl: string;
	children?: React.ReactNode;
}

const SphereBackground: React.FC<SphereBackgroundProps> = ({
	sceneUrl,
	children,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const app = new Application(canvasRef.current);
			app.load(sceneUrl);
		}
	}, [sceneUrl]);

	return (
		<div className='relative w-full mx-auto h-[1024px] '>
			<Link
				to='/'
				className='absolute top-0 left-0 z-20'
			>
				<figure className='w-36 h-14'>
					<img
						src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713222392/AwareGaming/logo_ed2n0h.png'
						alt='logo'
					/>
				</figure>
			</Link>
			<canvas
				ref={canvasRef}
				id='canvas3d'
				className='absolute z-10 w-full h-full'
			/>
			{children}
		</div>
	);
};

export default SphereBackground;
