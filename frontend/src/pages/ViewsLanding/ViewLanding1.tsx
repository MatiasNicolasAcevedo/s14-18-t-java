import { Link } from 'react-router-dom';

export const ViewLanding1 = () => {
	return (
		<div className='w-full h-screen'>
			<div className='max-w-7xl mx-auto py-28 flex items-center justify-center  h-screen'>
				<div className='hero flex gap-12'>
					<div className=' w-6/12 hero-content flex-col items-start'>
						<h1 className=" text-left text-black text-[64px] font-black font-['Nunito'] leading-[150%]">
							Aware Gaming
						</h1>
						<p className=' w-full text-black text-[24px] font-normal font-Nunito leading-[36px]'>
							Bienvenido a nuestra plataforma de juegos, donde creemos en el
							juego responsable. Únete a esta experiencia y aprende acerca de la
							importancia divertirse conscientemente
						</p>
						<div className=' w-full flex justify-center'>
							<Link to='/login'>
								<figure className='w-44 h-14'>
									<img
										src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713475908/Group_1000004362-min_raylh2.png'
										alt=''
									/>
								</figure>
							</Link>
						</div>
					</div>
					<div className='w-6/12'></div>
				</div>
			</div>
		</div>
	);
};
