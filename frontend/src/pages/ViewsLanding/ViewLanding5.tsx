export const ViewLanding5 = () => {
	return (
		<div className="'w-full h-[80hv] mb-16 ">
			<p className='text-center text-5xl font-Nunito text-gray-950 font-black'>
				Contacto
			</p>
			<form className='max-w-md mx-auto mt-8 flex flex-col items-center gap-10'>
				<div className=' w-3/4 h-12 shadow-custom flex-col justify-start items-start inline-flex'>
					<input
						type='text'
						name='nombre'
						placeholder='Nombre'
						className='grow shrink basis-0 h-5 text-gray-700 text-sm font-normal font-Nunito leading-tight shadow-custom w-full pl-4'
					/>
				</div>
				<div className='w-3/4 h-12 shadow-custom flex-col justify-start items-start inline-flex'>
					<input
						type='email'
						name='email'
						placeholder='Email'
						className='grow shrink basis-0 h-5 text-gray-700 text-sm font-normal font-Nunito leading-tight shadow-custom w-full pl-4'
					/>
				</div>
				<div className='w-3/4 h-60 px-6 py-4 bg-white rounded-lg shadow-custom border border-gray-300 justify-start items-center gap-2 inline-flex'>
					<textarea
						name='mensaje'
						placeholder='Mensaje'
						className='grow shrink basis-0 h-16 text-gray-700 text-base font-normal font-Inter leading-normal'
					></textarea>
				</div>
				<div className='w-52 h-12 px-6 py-5 bg-fuchsia-700 rounded-full shadow-custom border-none justify-center items-center gap-2 inline-flex'>
					<button
						type='submit'
						className='text-gray-50 text-base font-normal font-Inter leading-normal'
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
};
