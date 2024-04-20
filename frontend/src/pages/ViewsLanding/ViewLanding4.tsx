/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardJuego } from '@/components/CardJuego/CardJuego';

interface CardLanding {
	title: string;
	text: string;
	img: string;
}

interface CardLandingList {
	cards: CardLanding[];
}

export const ViewLanding4: React.FC<CardLandingList> = () => {
	const cards: CardLanding[] = [
		{
			title: 'Slot Care',
			text: 'Juega al tragamonedas conscientemente',
			img: 'https://res.cloudinary.com/dnxjwcku6/image/upload/v1713281902/Group_1000004324-min_bzyrgg.png',
		},
		{
			title: 'Slot Care',
			text: 'Juega al tragamonedas conscientemente',
			img: 'https://res.cloudinary.com/dnxjwcku6/image/upload/v1713281903/Group_1000004319-min_aec32x.png',
		},
		{
			title: 'Slot Care',
			text: 'Juega al tragamonedas conscientemente',
			img: 'https://res.cloudinary.com/dnxjwcku6/image/upload/v1713288751/Group_1000004326-min_weetqq.png',
		},
	];
	return (
		<div className='w-full h-screen'>
			<div className='container max-w-7xl mx-auto'>
				<p className='text-center text-5xl bg-gradient-to-r from-[#8D3DA5] to-[#FC9A53] bg-clip-text text-[transparent] font-Nunito  font-black'>
					Descubre nuestros juegos disponibles
				</p>
				<div className='flex justify-between my-28'>
					{cards.map((card, index) => (
						<CardJuego
							key={index}
							card={card}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
