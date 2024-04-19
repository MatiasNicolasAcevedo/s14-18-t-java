import TimeChart from '@/components/TimeChart/TimeChart';

const Profile: React.FC = () => {
	return (
		<>
			<div className='flex flex-wrap space-y-1 max-w-[416px]'>
				<div className=' bg-[#0c959526] backdrop-blur-md flex flex-col justify-end items-start p-8 space-y-4 flex-shrink-0 w-[199px] h-[294px] rounded-[17px] border border-base-base-200'>
					<div className='avatar online'>
						<div className='w-24 rounded-full'>
							<img
								alt='avatar'
								src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
							/>
						</div>
					</div>

					<p className=' text-black  text-lg font-semibold leading-none '>
						Isabel Burdiz
					</p>
					<p>isabelb@gmail.com </p>
					<button className='bg-base-base-100 border border-base-base-100 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700'>
						Haz clic aquí
					</button>
				</div>
				<div className=' bg-[#0c959526] backdrop-blur-md flex flex-col justify-end items-start p-8 space-y-4 flex-shrink-0 w-[199px] h-[294px] rounded-[17px] border border-base-base-200'>
					{/* Aquí puedes agregar el contenido de tu div */}
				</div>
				<div className='w-[416px] h-[291px] flex-shrink-0 rounded-[20px] bg-[rgba(12,149,149,0.20)] backdrop-blur-[15px]'>
					<TimeChart></TimeChart>
				</div>
				<div className='flex flex-col justify-end items-end p-8 space-y-4 flex-shrink-0 w-[416px] h-[138px] rounded-[17px] border border-base-base-200  bg-[#0c959526] backdrop-blur-md'>
					{/* Aquí puedes agregar el contenido de tu div */}
				</div>
			</div>

			<div className='space-y-1'>
				<div className=' hero flex flex-col justify-end items-start p-8 space-y-4 flex-shrink-0 w-[632px] h-[241px] rounded-[17px] border border-base-base bg-spin-wise  bg-custom-pink backdrop-blur-md'>
					{/* Aquí puedes agregar el contenido de tu div */}
				</div>
				<div className='flex flex-col justify-end items-start p-8 space-y-4 flex-shrink-0 w-[632px] h-[241px] rounded-[17px] border border-base-base  bg-[#0c959526] backdrop-blur-md'>
					{/* Aquí puedes agregar el contenido de tu div */}
				</div>
				<div className='flex flex-col justify-end items-start p-8 space-y-4 flex-shrink-0 w-[632px] h-[241px] rounded-[17px] border border-base-base  bg-[#0c959526] backdrop-blur-md'>
					{/* Aquí puedes agregar el contenido de tu div */}
				</div>
			</div>
		</>
	);
};
export default Profile;
