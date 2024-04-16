const redes = [
	{ name: 'Instragram', link: '', src: '' },
	{ name: 'LinkdIn', link: '', src: '' },
	{ name: 'Facebook', link: '', src: '' },
];

export function Footer() {
	return (
		<footer className='footer pt-5 pb-10 px-20 bg-[#8D3DA5] text-white rounded-t-[100px]'>
			<aside className='self-center justify-self-center'>
				<figure className='w-48 h-20 border'>
					<img
						src=''
						alt=''
					/>
				</figure>
			</aside>
			<nav>
				<a className='link link-hover'>Home</a>
				<a className='link link-hover'>Foro</a>
				<a className='link link-hover'>Juegos</a>
				<a className='link link-hover'>Términos y Condiciones</a>
			</nav>
			<nav>
				<a className='link link-hover'>Privacidad</a>
				<a className='link link-hover'>Contacto</a>
				<a className='link link-hover'>Ayuda</a>
			</nav>
			<nav>
				<p>Seguinos en</p>
				<ul className='flex'>
					{redes.map(red => (
						<li key={red.name}>
							<a className='link link-hover'>
								<img
									src={red.src}
									alt={red.name}
									className='w-12 h-12'
								/>
							</a>
						</li>
					))}
				</ul>
				<p>¿Querés formar parte de nuestra red?</p>
				<button>Registrate aquí</button>
			</nav>
		</footer>
	);
}
