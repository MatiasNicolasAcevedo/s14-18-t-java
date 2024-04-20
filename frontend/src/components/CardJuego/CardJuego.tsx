/* eslint-disable @typescript-eslint/no-unused-vars */

export const CardJuego: React.FC<CardLandingList> = ({ card }) => {
	return (
		<>
			<div className='flex flex-col w-[400px] h-auto bg-white rounded-2xl items-start gap-2 overflow-hidden shadow-custom p-5'>
				<div className='bg-gradient-to-b from-white to-custom-purple h-48'>
					<img
						className='object-contain origin-top-left rotate-[0.65deg]'
						src={card.img}
					/>
				</div>
				<div className='w-full h-44 px-8 pt-2.5 pb-4 flex-col justify-end items-start gap-4 inline-flex'>
					<div className='self-stretch h-14 flex-col justify-start items-start flex'>
						<div className='self-stretch justify-start items-start gap-2 inline-flex'>
							<div className=' text-gray-800 text-[24px] font-Nunito leading-[32px] font-semibold'>
								{card.title}
							</div>
						</div>
						<div className='text-gray-800 text-[14px] font-Nunito leading-[24px] font-ligth'>
							{card.text}
						</div>
					</div>
					<div className='w-28 h-9 rounded-3xl justify-start items-start gap-2 inline-flex'>
						<div className='grow shrink basis-0 self-stretch px-3.5 py-3 bg-gradient-to-b from-purple-400 to-fuchsia-700 rounded-lg border border-purple-400 justify-center items-center gap-2 flex'>
							<div className="text-gray-50 text-sm font-black font-['Nunito']">
								Jugar
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
