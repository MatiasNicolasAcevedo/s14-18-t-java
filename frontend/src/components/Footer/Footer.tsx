import { Link } from 'react-router-dom';

const redes = [
	{
		name: 'Instragram',
		src: 'https://res.cloudinary.com/dnxjwcku6/image/upload/v1713299737/Instagram-min_v8vqd1.png',
		alt: 'icono instragram',
	},
	{
		name: 'LinkdIn',
		src: 'https://res.cloudinary.com/dnxjwcku6/image/upload/v1713299740/LinkedIn-min_s87t8r.png',
		alt: 'icono linkdin',
	},
	{
		name: 'Facebook',
		src: 'https://res.cloudinary.com/dnxjwcku6/image/upload/v1713299744/Facebook_Circled-min_lo7ppy.png',
		alt: 'icono facebook',
	},
];

export function Footer() {
	return (
		<footer className='footer pt-5 pb-10 px-20 bg-custom-purple text-white rounded-t-[100px]'>
			<aside className='self-center '>
				<figure className='w-48 h-20'>
					<img
						src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713282434/Group_1000004232-min_fbn4xe.png'
						alt='logo'
					/>
				</figure>
			</aside>
			<nav className='flex flex-col gap-5'>
				<a className='link link-hover'>Home</a>
				<a className='link link-hover'>Foro</a>
				<a className='link link-hover'>Juegos</a>
				<a className='link link-hover'>Términos y Condiciones</a>
			</nav>
			<nav className='flex flex-col gap-5'>
				<a className='link link-hover'>Privacidad</a>
				<a className='link link-hover'>Contacto</a>
				<a className='link link-hover'>Ayuda</a>
			</nav>
			<nav className='flex flex-col gap-7'>
				<section className='flex flex-col gap-1'>
					<p>Seguinos en</p>
					<ul className='flex gap-1'>
						{redes.map(red => (
							<li key={red.name}>
								<Link
									to='/'
									className='link link-hover'
								>
									<img
										src={red.src}
										alt={red.alt}
										className='w-12 h-12'
									/>
								</Link>
							</li>
						))}
					</ul>
				</section>
				<section>
					<p>¿Querés formar parte de nuestra comunidad?</p>
					<Link to='/register'>
						<figure className='w-44 h-14'>
							<img
								src='https://res.cloudinary.com/dnxjwcku6/image/upload/v1713283541/Group_1000004325-min_oisxnv.png'
								alt=''
							/>
						</figure>
					</Link>
				</section>
			</nav>
		</footer>
	);
}
