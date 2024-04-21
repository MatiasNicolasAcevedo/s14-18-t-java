import TimeChart from '@/components/TimeChart/TimeChart';

const Profile: React.FC = () => {
	return (
		<>
			<div className='w-1/3 space-x-1 space-y-2 flex flex-col '>
				<div className='w-full space-x-2 flex'>
					<div className=' bg-[#0c959526] backdrop-blur-md flex flex-col justify-end items-start p-8 space-y-4 w-1/2 rounded-[17px] border border-base-base-200'>
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
						<button className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2 '>
							<div className='text-gray-800 text-sm font-bold font-Nunito leading-tight'>
								Ver Perfil
							</div>
						</button>
					</div>
					<div className=' bg-[#0c959526] backdrop-blur-md flex flex-col justify-end items-start p-8 w-1/2  rounded-[17px] border border-base-base-200'>
						<div className=' items-center gap-4 '>
							<div className='flex flex-col justify-start items-start gap-1 '>
								<div className='opacity-80 text-gray-700 text-base font-bold font-Nunito leading-normal'>
									Creditos
								</div>
								<div className='text-gray-700 text-4xl font-bold font-Nunito leading-10'>
									1000
								</div>
								<div className='opacity-40 text-gray-700 text-xs font-bold font-Nunito leading-none'>
									GANAR MAS CREDITOS
								</div>
							</div>
							<button className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2'>
								<div className='text-gray-800 text-sm font-bold font-Nunito leading-tight'>
									Jugar
								</div>
							</button>
						</div>
					</div>
				</div>

				<div className=' space-y-2 w-full '>
					<div className=' rounded-[20px] bg-[rgba(12,149,149,0.20)] backdrop-blur-[15px]'>
						<TimeChart></TimeChart>
					</div>
					<div className='flex flex-col justify-end items-end p-8 space-y-4 rounded-[17px] border border-base-base-200 bg-blog-background bg-contain bg-no-repeat  bg-[rgba(12,149,149,0.20)] backdrop-blur-[15px]'>
						<div className='w-auto space-y-2 flex'>
							<div className='w-[194px] h-8 flex justify-start items-center gap-4 '>
								<div className='flex flex-col justify-start items-start gap-1 '>
									<h1 className='text-gray-700 text-[32px] font-bold font-Nunito leading-loose'>
										Nuestro Foro
									</h1>
									<button className='w-[68px] h-8 px-1 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center  '>
										<span className='text-gray-800 text-sm font-bold font-nunito leading-tight'>
											Visitar
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='space-y-1 w-2/3 '>
				<div className='flex items-start  p-8 space-y-4  w-full h-[241px] rounded-[17px] border border-base-base bg-card-ruleta bg-contain bg-right bg-no-repeat bg-custom-pink   '>
					<div className='flex flex-col justify-end items-start p-8 w-1/2 rounded-[17px] '>
						<h1 className='text-gray-700 text-[32px] font-black font-Nunito leading-loose'>
							SPIN WISE
						</h1>
						<button className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2 '>
							<div className='text-gray-800 text-sm font-bold font-Nunito leading-tight'>
								jugar
							</div>
						</button>
					</div>
				</div>

				<div className='flex  flex-row justify-end  items-start p-8 space-y-4  w-full h-[241px] rounded-[17px] border border-base-base bg-dice-background bg-no-repeat bg-contain bg-left bg-custom-purple'>
					<div className='flex justify-end w-1/3 p-4'>
						<h1 className='text-gray-700 text-[32px] font-black font-Nunito leading-loose'>
							PROXIMAMENTE DICE AWARRE
						</h1>
					</div>
				</div>
				<div className='flex  flex-row justify-start  items-start p-8 space-y-4  w-full h-[241px] rounded-[17px] border border-base-base bg-card-roll bg-no-repeat bg-contain bg-right bg-custom-blue'>
					<div className='flex justify-start w-1/3 p-4'>
						<h1 className='text-gray-700 text-[32px] font-black font-Nunito leading-loose'>
							PROXIMAMENTE SLOT CARE
						</h1>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profile;
//bg-card-ruleta
