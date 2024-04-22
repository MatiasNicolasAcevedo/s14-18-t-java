import { Link } from 'react-router-dom';
import { useRoullete } from '@/hooks';

export function RoulletePage() {
	const { roullete, setBetType, setBetAmount, bet } = useRoullete();

	const { selectedBetType, selectedBetAmount } = roullete;

	const handlerOnClickSelectBetType = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		const span = event.target as HTMLSpanElement;
		const betType = span.textContent as string;
		setBetType(betType);
	};

	const handlerOnClickSelectMont = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		const span = event.target as HTMLSpanElement;
		const betAmount = span.textContent as string;
		setBetAmount(betAmount);
	};

	const handlerOnClickBet = () => bet();

	return (
		<div className='w-full flex justify-between relative bg-transparent mt-52 px-10'>
			<section className='flex gap-8'>
				<div className='flex flex-col gap-3'>
					<h2 className='text-black text-3xl font-semibold font-Nunito leading-10'>
						Spin Wise
					</h2>
					<p className='text-black text-base font-normal font-Nunito leading-normal'>
						Elige la opción en la que deseas apostar
					</p>
					<div className='w-full flex justify-center'>
						<button
							onClick={handlerOnClickSelectBetType}
							className={`${selectedBetType === '0' ? 'border-4 border-fuchsia-700' : ''} w-52 h-14 px-6 py-5 bg-gray-700 rounded-lg justify-center items-center gap-2 inline-flex`}
						>
							<span className='text-gray-50 text-4xl font-normal leading-snug'>
								0
							</span>
						</button>
					</div>
					<div className='w-[450px] flex justify-between items-center'>
						<div className='w-16 flex flex-col justify-start items-start gap-6'>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === '1° 12' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} w-16 h-64 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 inline-flex`}
							>
								<span className='flex justify-center items-center gap-3 text-gray-50 text-4xl font-normal leading-loose'>
									1° 12
								</span>
							</button>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === '2° 12' ? 'border-4' : ''} w-16 h-64 px-6 py-5 bg-gray-100 rounded-lg border border-fuchsia-700 justify-center items-center gap-2 inline-flex`}
							>
								<span className='flex justify-center items-center gap-3 text-gray-800 text-4xl font-normal leading-loose'>
									2° 12
								</span>
							</button>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === '3° 12' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} w-16 h-64 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg  justify-center items-center gap-2 inline-flex`}
							>
								<span className='flex flex-col justify-center items-center gap-3 text-gray-50 text-4xl font-normal leading-loose'>
									3° 12
								</span>
							</button>
						</div>
						<div className='h-full'>
							<div className='flex flex-col justify-star items-center gap-3.5'>
								<div className='flex flex-col justify-start items-start gap-2.5'>
									<div className='justify-start items-start gap-5 inline-flex'>
										<button
											onClick={handlerOnClickSelectBetType}
											className={`${selectedBetType === '1' ? 'border-4' : 'border'} h-14 px-6 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
										>
											<span className='text-gray-800 text-4xl font-normal leading-snug'>
												1
											</span>
										</button>
										<button
											onClick={handlerOnClickSelectBetType}
											className={`${selectedBetType === '2' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
										>
											<span className='text-gray-50 text-4xl font-normal leading-snug'>
												2
											</span>
										</button>
										<button
											onClick={handlerOnClickSelectBetType}
											className={`${selectedBetType === '3' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-6 py-5 bg-gray-100 rounded-lg border border-fuchsia-700 justify-center items-center gap-2 flex`}
										>
											<span className='text-gray-800 text-4xl font-normal leading-snug'>
												3
											</span>
										</button>
									</div>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '4' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											4
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '5' ? 'border-4' : 'border'} h-14 px-6 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											5
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '6' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											6
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '7' ? 'border-4' : 'border'} h-14 px-6 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											7
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '8' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											8
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '9' ? 'border-4' : 'border'} h-14 px-6 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											9
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '10' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											10
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '11' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											11
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '12' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											12
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '13' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											13
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '14' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											14
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '15' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											15
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '16' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											16
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '17' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											17
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '18' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											18
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '19' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											19
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '20' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											20
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '21' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											21
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '22' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											22
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '23' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											23
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '24' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											24
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '25' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											25
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '26' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											26
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '27' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											27
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '28' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											28
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '29' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											29
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '30' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											30
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '31' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											31
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '32' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											32
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '33' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											33
										</span>
									</button>
								</div>
								<div className='justify-start items-start gap-5 inline-flex'>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '34' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											34
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '35' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} h-14 px-4 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-50 text-4xl font-normal leading-snug'>
											35
										</span>
									</button>
									<button
										onClick={handlerOnClickSelectBetType}
										className={`${selectedBetType === '36' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
									>
										<span className='text-gray-800 text-4xl font-normal leading-snug'>
											36
										</span>
									</button>
								</div>
							</div>
						</div>
						<div className='w-16 flex flex-col justify-between items-start gap-11'>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === '1 - 18' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} w-16 h-48 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 inline-flex`}
							>
								<span className='flex flex-col items-center justify-center text-gray-50 text-4xl font-normal'>
									1 - 18
								</span>
							</button>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === 'P A R' ? 'border-4' : 'border'} w-16 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2`}
							>
								<span className='text-center text-gray-800 text-xl font-normal flex flex-col leading-none'>
									P A R
								</span>
							</button>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === 'I M P A R' ? 'border-4' : 'border'} w-16 px-6 py-1 bg-gray-100 rounded-lg border border-fuchsia-700 justify-center items-center gap-2 inline-flex`}
							>
								<span className='flex flex-col items-center justify-center text-gray-800 text-xl font-normal leading-none'>
									I M P A R
								</span>
							</button>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === '19 - 36' ? 'border-4 border-fuchsia-700' : 'border border-gray-100'} w-16 h-48 px-6 py-5 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-lg justify-center items-center gap-2 inline-flex`}
							>
								<div className='flex flex-col items-center justify-center text-gray-50 text-4xl font-normal'>
									19 - 36
								</div>
							</button>
						</div>
					</div>
					<div className='w-full flex justify-center'>
						<div className='h-14 justify-start items-start gap-5 inline-flex'>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === 'C1' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
							>
								<span className='text-gray-800 text-4xl font-normal leading-snug'>
									C1
								</span>
							</button>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === 'C2' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
							>
								<span className='text-gray-800 text-4xl font-normal leading-snug'>
									C2
								</span>
							</button>
							<button
								onClick={handlerOnClickSelectBetType}
								className={`${selectedBetType === 'C3' ? 'border-4' : 'border'} h-14 px-4 py-5 bg-gray-100 rounded-lg border-fuchsia-700 justify-center items-center gap-2 flex`}
							>
								<span className='text-gray-800 text-4xl font-normal leading-snug'>
									C3
								</span>
							</button>
						</div>
					</div>
				</div>
				<div className='w-12 flex flex-col justify-center items-center gap-12'>
					<button
						onClick={handlerOnClickSelectBetType}
						className={`${selectedBetType === 'COLOR' ? 'border-4 border-fuchsia-700' : ''} w-12 h-12 bg-gradient-to-r from-fuchsia-700 to-orange-400 rounded-full`}
					>
						<span hidden>COLOR</span>
					</button>
					<button
						onClick={handlerOnClickSelectBetType}
						className={`${selectedBetType === 'WHITE' ? 'border-4' : 'border-2'} w-12 h-12 bg-white rounded-full border-fuchsia-700`}
					>
						<span hidden>WHITE</span>
					</button>
				</div>
			</section>
			<section className='mt-28 h-full'>
				<div className='flex flex-col w-[450px] h-full gap-32'>
					<div className='px-16 py-6 bg-teal-600 bg-opacity-30 rounded-2xl backdrop-blur-xl flex-col justify-center items-center gap-2.5 flex ml-14 mr-20'>
						<div className='pb-2 flex-col justify-center items-center gap-2 flex'>
							<div className='text-gray-800 text-3xl font-normal'>Tienes:</div>
							<div className='text-fuchsia-700 text-6xl font-black'>1000</div>
							<div className='text-gray-800 text-xl font-normal'>créditos</div>
						</div>
						<div className='pb-4 flex-col justify-center items-center gap-3 flex'>
							<div className='text-gray-800 text-xl font-semibold'>Apostar</div>
							<div className='flex-col justify-center items-center gap-5 flex'>
								<button
									onClick={handlerOnClickSelectMont}
									className={`${selectedBetAmount === '1 crédito' ? 'border-4 border-fuchsia-700' : 'border border-gray-800'} px-3 py-0.5 rounded-full justify-center items-center gap-4 inline-flex `}
								>
									<div className='text-center text-gray-800 text-xs font-normal leading-none'>
										1 crédito
									</div>
								</button>
								<button
									onClick={handlerOnClickSelectMont}
									className={`${selectedBetAmount === '5 créditos' ? 'border-4 border-fuchsia-700' : 'border border-gray-800'} px-3 py-0.5 rounded-full justify-center items-center gap-4 inline-flex`}
								>
									<div className='text-center text-gray-800 text-xs font-normal leading-none'>
										5 créditos
									</div>
								</button>
								<button
									onClick={handlerOnClickSelectMont}
									className={`${selectedBetAmount === '10 créditos' ? 'border-4 border-fuchsia-700' : 'border border-gray-800'} px-3 py-0.5 rounded-full justify-center items-center gap-4 inline-flex`}
								>
									<div className='text-center text-gray-800 text-xs font-normal leading-none'>
										10 créditos
									</div>
								</button>
							</div>
						</div>
						<div className='self-stretch justify-center items-center gap-7 inline-flex'>
							<div className='px-4 py-3.5 rounded-lg justify-center items-center gap-2 flex'>
								<Link
									to='/dashboard/profile'
									className='text-gray-800 text-base font-normal leading-tight'
								>
									Salir
								</Link>
							</div>
							<div className='px-4 py-3.5 bg-gray-100 rounded-lg shadow-custom justify-center items-center gap-2 flex'>
								<button
									onClick={handlerOnClickBet}
									className='text-gray-800 text-lg font-normal leading-tight'
								>
									Apostar
								</button>
							</div>
						</div>
					</div>
					<figure className='w-full self-end'>
						<img
							src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713555467/AwareGaming/Group_1000004299-min_1_cczntx.png'
							alt='ruleta'
						/>
					</figure>
				</div>
			</section>
			<section className='flex w-28 h-14 items-center gap-2'>
				<img
					className='w-14 h-14'
					src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713577039/Group_1000004308-min_ftaak5.png'
				/>
				<p className='text-black text-xl font-medium leading-tight'>1000</p>
			</section>
		</div>
	);
}
