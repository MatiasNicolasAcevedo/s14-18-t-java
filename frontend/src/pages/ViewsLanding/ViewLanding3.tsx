import { Link } from 'react-router-dom';

export const ViewLanding3 = () => {
	return (
		<div className='w-full h-[80hv] bg-landing-3	bg-center bg-cover '>
			<div className='max-w-7xl mx-auto pt-28 flex items-center justify-end h-screen'>
				<div className=' w-2/4 hero-content h-full flex-col justify-start items-start'>
					<h4 className='text-black text-base font-bold font-Nunito leading-normal'>
						Descubrí
					</h4>
					<div className=' w-full h-28 text-left font-black text-5xl font-Nunito text-black'>
						Únete a nuestra comunidad
					</div>
					<div className=' w-4/5  text-left text-black text-base font-normal font-Nunito'>
						Recibe notificaciones sobre tu tiempo de juego, conoce las
						probabilidades reales de ganar, establece límites de tiempo y
						realiza una comparación realista del posible impacto financiero.
					</div>
				</div>
				<div className='w-2/4 h-full flex flex-col grow justify-center items-center  '>
					<div className='w-full flex justify-between items-start'>
						<div>
							<figure className='w-24 h-24'>
								<img src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713478927/Chat-min_igthn1.png' />
							</figure>
							<h4 className='text-black text-base font-bold font-Nunito leading-normal'>
								Social
							</h4>
							<div className=' w-80 text-black text-base font-normal font-Nunito leading-normal'>
								Promovemos la socialización mediante un foro, donde encontrarás
								artículos de interés y podrás comentar y opinar. Mediante el
								chat privado, podrás conocer personas y compartir experiencias.
							</div>
						</div>
						<div>
							<div>
								<figure className='w-24 h-24'>
									<img src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713478927/Group_1000004354-min_spicix.png' />
								</figure>
								<h4 className='text-black text-base font-bold font-Nunito leading-normal'>
									Diversion
								</h4>
							</div>
							<div className='w-80 text-black text-base font-normal font-Nunito leading-normal'>
								Fomentamos el juego con el objetivo de la diversión, no el
								rédito económico. Es por ésto que no usamos dinero real.
							</div>
						</div>
					</div>
					<div className='w-full flex justify-center items-center gap-8 pt-8'>
						<div className='bg-white w-36 h-12 px-7 py-3 rounded-3xl text-black text-sm font-normal leading-tight font-Nunito shadow-custom'>
							<div className='flex flex-col items-center'>
								<Link to={'/login'}>Iniciar sesión</Link>
							</div>
						</div>
						<div className='text-black text-sm font-normal font-Nunito leading-tight'>
							<div className='flex flex-col items-center'>
								<Link to={'/register'}>Regístrate</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
