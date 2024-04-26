import { Link } from 'react-router-dom';

export const CardForo = () => {
	return (
		<div>
			<div className='bg-[#0c959526] backdrop-blur-[15px] h-[198px] rounded-2xl'>
				<div className='flex justify-between '>
					<div className='w-40 h-40 rounded-2xl shadow m-5'>
						<img
							className='w-40 h-40 left-0 top-0 object-cover rounded-2xl'
							src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
						/>
					</div>
					<div className='rounded-xl m-5 max-w-[500px] flex flex-col justify-between'>
						<div className=' justify-start items-start gap-2 flex'>
							<p className="grow shrink basis-0 text-gray-800 text-md font-bold font-['Nunito'] leading-8">
								El uso de videojuegos en adolescentes. Un problema de Salud
								Pública
							</p>
						</div>
						<h4 className=' font-Nunito text-base font-normal text-[#374151] leading-none mt-3	'>
							Mónica Rodríguez Rodríguez, Francisca María García Padilla
						</h4>
						<div className='flex justify-between items-end mt-6'>
							<div>
								<div className='bg-white w-36 h-12 px-7 py-3 rounded-3xl text-black text-sm font-normal leading-tight shadow-custom'>
									<div className='flex flex-col items-center'>
										<Link to='post'>Leer</Link>
									</div>
								</div>
							</div>
							<div className='flex justify-around items-end align-middle w-2/4 text-gray-900'>
								<div>
									<p>5 comentarios</p>
								</div>
								<div>
									<p>2 me gusta</p>
								</div>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
};
