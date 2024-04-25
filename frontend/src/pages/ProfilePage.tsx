import TimeChart from '@/components/TimeChart/TimeChart';
import { useState } from 'react';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';
import { Link } from 'react-router-dom';
import { useUser } from '@/hooks';

const Profile: React.FC = () => {
	const [showProfile2, setShowProfile2] = useState(false);
	const { user } = useUser();

	const { firstName, lastName, email, credits } = user;

	const handlerOnClickShowProfile = () => setShowProfile2(!showProfile2);

	return (
		<>
			<div className='w-1/2 space-x-1 space-y-2 h-full flex flex-col '>
				<div className='w-full h-3/6 space-x-2 flex '>
					<div className=' bg-[#0c959526] backdrop-blur-md flex flex-col  items-start p-8 justify-between w-1/2 rounded-[17px]'>
						<div className='avatar online'>
							<div className='w-20 h-20 rounded-full'>
								<img
									className='w-full h-full rounded-full object-cover'
									alt='avatar'
									src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
								/>
							</div>
						</div>
						<div className='flex flex-col space-y-3 '>
							<div className='flex flex-col space-y-3'>
								<p className=' text-black  text-lg font-semibold leading-none '>
									{firstName} {lastName}
								</p>
								<p className='opacity-40 text-gray-700 text-xs font-bold font-nunito leading-none'>
									{email}
								</p>
							</div>

							<button
								onClick={handlerOnClickShowProfile}
								type='button'
								className='w-full h-8 px-3 py-1.5 p-3 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2 '
							>
								<span className='text-gray-800 text-sm font-bold font-Nunito leading-tight'>
									Ver Perfil
								</span>
							</button>
						</div>
					</div>
					<div className=' bg-[#0c959526] backdrop-blur-md flex flex-col justify-end items-start p-8 w-1/2  rounded-[17px]'>
						<div className='flex flex-col  gap-4 justify-around '>
							<div className='flex flex-col  items-start gap-1 '>
								<span className='opacity-80 text-gray-700 text-base font-bold font-Nunito leading-normal'>
									Créditos
								</span>
								<h2 className='text-gray-700 text-4xl font-bold font-Nunito leading-10'>
									{credits}
								</h2>
								<span className='opacity-40 text-gray-700 text-xs font-bold font-Nunito leading-none'>
									GANAR MAS CREDITOS
								</span>
							</div>
							<button
								type='button'
								className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2'
							>
								<div className='text-gray-800 text-sm font-bold font-Nunito leading-tight'>
									Jugar
								</div>
							</button>
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-around p-6 w-full h-2/3 bg-teal-600 bg-opacity-20 rounded-[20px] backdrop-blur-[30px]'>
					<div className='flex justify-around'>
						<div>
							<span className="w-[200px] h-5 text-gray-700 text-xs font-medium font-['DM Sans'] leading-snug">
								HORAS EN PANTALLA
							</span>
							<h2 className="text-gray-700 text-4xl font-bold font-['Nunito'] leading-[38.29px]">
								2.55
							</h2>
						</div>

						<div className='flex items-center gap-2'>
							<span className="text-center text-gray-800 text-[15px] font-bold font-['DM Sans'] leading-[18.23px]">
								+2.45%
							</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-5 h-5'
								viewBox='0 0 17 17'
								fill='none'
							>
								<g clip-path='url(#clip0_813_2174)'>
									<rect
										width='16.4108'
										height='16.4108'
										transform='translate(0.0351562 0.469727)'
										fill='#1F2937'
									/>
									<path
										d='M4.82031 10.0459L8.23922 6.62695L11.6581 10.0459H4.82031Z'
										fill='white'
									/>
								</g>
								<defs>
									<clipPath id='clip0_813_2174'>
										<rect
											width='16.4108'
											height='16.4108'
											fill='white'
											transform='translate(0.0351562 0.469727)'
										/>
									</clipPath>
								</defs>
							</svg>
						</div>
					</div>

					<div className='flex h-1/3 justify-center items-center'>
						<TimeChart></TimeChart>
					</div>
				</div>

				<div className='flex flex-col justify-end items-end p-8 space-y-4 rounded-[17px] border border-base-base-200 bg-blog-background bg-contain bg-no-repeat  bg-[#cadde0]  backdrop-blur-[15px]'>
					<div className='w-auto space-y-2 flex'>
						<div className='w-[194px] h-8 flex justify-start items-center gap-4 '>
							<div className='flex flex-col justify-end gap-1 '>
								<h1 className='text-gray-700 text-[32px] font-bold font-Nunito leading-loose'>
									Nuestro Foro
								</h1>
								<button
									type='button'
									className='w-[68px] h-8 px-1 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center   '
								>
									<span className='text-gray-800 text-sm font-bold font-nunito leading-tight'>
										Visitar
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex  space-y-2 w-2/3'>
				{showProfile2 && (
					<EditProfileForm toggleProfile={handlerOnClickShowProfile} />
				)}
				<div className={`space-y-1 ${showProfile2 ? 'w-1/3' : 'w-full'}`}>
					<div className='flex items-start  p-8 space-y-4  w-full h-1/3 rounded-[17px]  bg-card-ruleta bg-contain bg-right bg-no-repeat bg-custom-pink  backdrop-blur-[15px] '>
						<div className='flex w-full flex-col justify-end items-start p-8  rounded-[17px] '>
							<h1 className='text-gray-700 text-[32px] font-black font-Nunito leading-loose'>
								SPIN WISE
							</h1>
							<Link
								to='/dashboard/roullete'
								className='w-[86px] h-8 px-3 py-1.5 text-gray-800 text-sm font-bold font-Nunito leading-tight bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2 hover:bg-gray-200 focus:bg-gray-300 active:bg-gray-400'
							>
								jugar
							</Link>
						</div>
					</div>

					<div className='flex  flex-row justify-end  items-start p-8 space-y-4  w-full h-1/3 rounded-[17px]  bg-dice-background bg-no-repeat bg-contain bg-left bg-custom-purple backdrop-blur-[15px]'>
						<div className='flex justify-end w-1/3 p-4'>
							<h1 className='text-gray-700 text-[32px] font-black font-Nunito leading-loose'>
								PROXIMAMENTE DICE AWARE
							</h1>
						</div>
					</div>

					<div className='flex  flex-row justify-start  items-start p-8 space-y-4  w-full h-1/3 rounded-[17px]  bg-card-roll bg-no-repeat bg-contain bg-right bg-custom-blue backdrop-blur-[15px]'>
						<div className='flex justify-start w-1/3 p-4'>
							<h1 className='text-gray-700 text-[32px] font-black font-Nunito leading-loose'>
								PROXIMAMENTE SLOT CARE
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profile;
//
