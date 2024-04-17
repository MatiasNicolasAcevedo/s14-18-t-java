import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		/*screens:{
			sm:'480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},*/
		extend: {
			boxShadow: {
        'custom': '8px 8px 16px 0px rgba(107, 38, 128, 0.60), -2px -2px 16px 0px #D2B1DB inset, -4px -4px 10px 0px #8D3DA5 inset'
      },
			backdropFilter: {
        'none': 'none',
        'blur': 'blur(15px)',
      },
			maxWidth: {
        'sm': '480px',
        'md': '768px',
        'lg': '976px',
        'xl': '1440px',
      },
			zIndex: {
				'1': '1',
				'2': '2',
			},
			colors: {
        'custom-purple': '#8D3DA5',
      },

			fontFamily: {
				 'nunito': ['Nunito', 'sans-serif'],
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
			borderRadius: {
				"50p":"50%",
				"10p":"80px"
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
		variants: {
			extend: {
		  backdropFilter: ['responsive'],
			},
		},
	},
	plugins: [
	   daisyui,
	],
};
