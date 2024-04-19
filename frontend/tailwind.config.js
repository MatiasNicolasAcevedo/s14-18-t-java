import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit', // habilita el modo JIT
	purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens:{
			'sm': '640px',
      'md': '768px',
      'lg': '1000px',
      'xl': '1024px',
      '2xl': '1500px',
		},
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
				'custom-pink': '#f77fb9',
				'cool-gray-900': '#111827',
      },
			backgroundImage:{
        'aware-pattern': "url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713478180/AwareGaming/LANDING_13-min_1_xn7q1d.png')",
				'spin-wise' :" url(https://res.cloudinary.com/dnxjwcku6/image/upload/v1713555467/AwareGaming/Group_1000004299-min_1_cczntx.png)",
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
