import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens:{
			sm:'480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		extend: {
			maxWidth: {
        'custom': '300px', // Ajusta este valor a lo que necesites
      },
			colors: {
        'custom-purple': '#8D3DA5',
      },
			fontFamily: {
				body: ['Nunito'],
      },
			fontSize: {
        'xs': '12px',    // Extra pequeño
        'sm': '14px',    // Pequeño
        'base': '16px',  // Tamaño base (normal)
        'lg': '18px',    // Grande
        'xl': '32px',    // Extra grande
        '2xl': '64px',   // Doble extra grande
        // Agrega más tamaños de texto personalizados si es necesario
      },
			daisyui: {
				themes: [
						{
								mytheme: {
										"primary": "#f3f4f6",
										"secondary": "#dc8400",
										"accent": "#953300",
										"neutral": "#292929",
										"base-100": "#fce7f3",
										"info": "#00b9ff",
										"success": "#66c800",
										"warning": "#ffa512",
										"error": "#ff7b81",
								},
						},
				],
		},
		},
	},
	plugins: [
	   daisyui,
	],
};
