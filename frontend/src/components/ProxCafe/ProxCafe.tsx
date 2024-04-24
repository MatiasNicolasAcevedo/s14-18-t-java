import { Link } from 'react-router-dom';

export const ProxCafe = () => {
	return (
		<div>
			<div className='flex flex-col justify-center items-center p-8 space-y-4 flex-shrink-0 w-full h-[241px] rounded-[17px] border border-base-base  bg-[#0c959526] backdrop-blur-md	'>
				<div>
					<p className=' text-gray-900 font-semibold text-lg'>
						Próximo Café virtual:
					</p>
				</div>
				<div className='w-full flex items-end justify-between '>
					<div className=' bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-2xl text-center p-2'>
						<p className=' text-xl font-Inter font-semibold text-white'>5</p>
						<p className='text-l font-Inter font-base text-white'>days</p>
					</div>
					<div className=' bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-2xl text-center p-2'>
						<p className=' text-xl font-Inter font-semibold text-white'>23</p>
						<p className='text-l font-Inter font-base text-white'>hours</p>
					</div>
					<div className=' bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-2xl text-center p-2'>
						<p className=' text-xl font-Inter font-semibold text-white'>54</p>
						<p className='text-l font-Inter font-base text-white'>minutes</p>
					</div>
					<div className=' bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-2xl text-center p-2'>
						<p className=' text-xl font-Inter font-semibold text-white'>36</p>
						<p className='text-l font-Inter font-base text-white'>sec</p>
					</div>
				</div>
				<div>
					<div className='bg-white w-36 h-12 px-7 py-3 rounded-3xl text-black text-sm font-normal leading-tight shadow-custom'>
						<div className='flex flex-col items-center'>
							<Link to={'/login'}>Anotarse</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
