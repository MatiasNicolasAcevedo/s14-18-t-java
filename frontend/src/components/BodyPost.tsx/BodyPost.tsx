import { Comments } from '../Comentarios/Comments';
import CommentsForm from '../Comentarios/Commentsform';

export const BodyPost = () => {
	return (
		<div className=' rounded-2xl flex flex-col items-center max-w-[640px]'>
			<div className='flex justify-between '>
				<div className='w-20 h-20 shadow m-5'>
					<img
						className='w-20 h-20 left-0 top-0 object-cover rounded-50p'
						src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
					/>
				</div>
				<div className='rounded-xl m-5 flex flex-col justify-between'>
					<div className=' justify-start items-start gap-2 flex'>
						<p className='grow shrink basis-0 text-gray-800 text-md font-bold font-Nunito leading-8'>
							El uso de videojuegos en adolescentes. Un problema de Salud
							Pública
						</p>
					</div>
					<h4 className=' font-Nunito text-base font-normal text-[#374151] leading-none mt-3	'>
						Mónica Rodríguez Rodríguez, Francisca María García Padilla
					</h4>
				</div>
			</div>
			<div className='text-gray-800 py-6 px-4 w-full flex flex-col items-center justify-center'>
				<div className=' max-w-[640px]'>
					<h2>Introducción:</h2>
					<p>
						El uso excesivo de videojuegos ha aumentado de manera vertiginosa y,
						especialmente, entre los varones con edades comprendidas entre los
						10 y los 19 años. Muchos adolescentes pierden el control sobre el
						videojuego, lo que puede tener consecuencias negativas como el juego
						patológico, problemático o la adicción al videojuego.
					</p>
					<h3>Objetivos:</h3>
					<p>
						Conocer la producción científica existente sobre el uso problemático
						de videojuegos y la adicción al videojuego en los adolescentes.
					</p>
					<h3>Metodología:</h3>
					<p>
						Se han analizado los documentos encontrados tras una búsqueda
						bibliográfica en las bases de datos COCHRANE, MEDLINE, LILACS,
						CINAHL y CUIDEN.
					</p>
					<h3>Resultados:</h3>
					<p>
						Se han definido los factores predictores, la prevalencia, las
						características, los cuestionarios validados, la relación con otras
						adicciones, la relación con el TEA (Trastorno del Espectro Autista)
						y con el TDAH (Trastorno por Déficit de Atención e Hiperactividad) y
						la prevención del uso problemático y la adicción al videojuego.
					</p>
					<h3>Conclusiones:</h3>
					<p>
						Hay inconsistencias en los resultados debido al diseño transversal
						de la mayoría de los estudios, a las muestras pequeñas, a la
						ausencia de muestras clínicas o aleatorizadas, a la extracción de
						datos con cuestionarios de autorreporte, a la realización de estos
						en colegios, sin tener en cuenta a los adolescentes ingresados en
						centros de salud mental u hospitales, a la falta de estudios en el
						género femenino y a la falta de estandarización de los criterios
						diagnósticos. El tema menos estudiado es el tratamiento y la
						prevención, el más importante para nuestra profesión, por lo que la
						principal futura línea de investigación sería en este ámbito.
					</p>
				</div>
				<div className='flex justify-end items-end mt-6 w-full max-w-2xl'>
					<div className='flex justify-end items-end align-middle text-gray-900'>
						<p className=' block'>2 me gusta</p>
					</div>
				</div>
			</div>
			<CommentsForm />
			<Comments />
		</div>
	);
};
