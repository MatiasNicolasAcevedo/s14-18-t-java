import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

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
