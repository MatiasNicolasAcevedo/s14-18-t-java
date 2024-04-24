export const ProxEven = () => {
	return (
		<div>
			<div className='flex flex-col justify-center items-center  p-8 space-y-4 flex-shrink-0 w-full rounded-[17px] border border-base-base  bg-[#0c959526] backdrop-blur-md	'>
				<div>
					<p className=' text-gray-900 font-semibold text-lg'>
						Próximos eventos:
					</p>
				</div>
				<div className='w-full flex flex-col items-end justify-between gap-4'>
					<div className='flex justify-between w-full gap-4'>
						<div className=' bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-2xl text-center p-2'>
							<p className=' text-xl font-Inter font-semibold text-white'>12</p>
							<p className='text-l font-Inter font-base text-white'>Mayo</p>
						</div>
						<div className='font-Nunito text-gray-900'>
							<p>
								Webinar “Cómo saber si el juego me está causando daño a la
								salud” <span className=' text-black font-bold'>Leer más</span>
							</p>
						</div>
					</div>
					<div className='flex justify-between w-full gap-4'>
						<div className=' bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-2xl text-center p-2'>
							<p className=' text-xl font-Inter font-semibold text-white'>16</p>
							<p className='text-l font-Inter font-base text-white'>Junio</p>
						</div>
						<div className='font-Nunito text-gray-900'>
							<p>
								Webinar “Cómo prevenir la adicción al juego”{' '}
								<span className=' text-black font-bold'>Leer más</span>
							</p>
						</div>
					</div>
					<div className='flex justify-between w-full gap-4'>
						<div className=' bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-2xl text-center p-2'>
							<p className=' text-xl font-Inter font-semibold text-white'>10</p>
							<p className='text-l font-Inter font-base text-white'>Junio</p>
						</div>
						<div className='font-Nunito text-gray-900'>
							<p>
								Webinar “El efecto del juego en las variables sociales”{' '}
								<span className=' text-black font-bold'>Leer más</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
