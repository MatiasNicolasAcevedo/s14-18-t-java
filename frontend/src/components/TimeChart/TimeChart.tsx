import { BarChart, Bar, XAxis, Tooltip } from 'recharts';

// Tus datos de horas en pantalla por día
const data = [
	{ name: 'L', Horas: 3 },
	{ name: 'M', Horas: 2 },
	{ name: 'M', Horas: 5 },
	{ name: 'J', Horas: 4 },
	{ name: 'V', Horas: 6 },
	{ name: 'S', Horas: 7 },
	{ name: 'D', Horas: 4 },
];

// Tu componente de gráfico
const TimeChart = () => (
	<BarChart
		width={400}
		height={200}
		data={data}
		margin={{
			top: 5,
			right: 30,
			left: 20,
			bottom: 5,
		}}
	>
		<defs>
			<linearGradient
				id='colorUv'
				x1='0'
				y1='0'
				x2='0'
				y2='1'
			>
				<stop
					offset='5%'
					stopColor='#B979CC'
					stopOpacity={0.8}
				/>
				<stop
					offset='95%'
					stopColor='#9951AF'
					stopOpacity={0.8}
				/>
			</linearGradient>
		</defs>
		<XAxis dataKey='name' />
		<Tooltip
			contentStyle={{
				backgroundColor: '#8884d8', // Color de fondo del tooltip
				borderRadius: '10px', // Bordes redondeados
				color: '#ffffff', // Color del texto
			}}
		/>
		<Bar
			dataKey='Horas'
			fill='url(#colorUv)'
			barSize={12} // El ancho de las barras
			radius={[10, 10, 0, 0]} // El radio de las esquinas de las barras. Esto redondeará las esquinas superiores.
		/>
	</BarChart>
);

export default TimeChart;
