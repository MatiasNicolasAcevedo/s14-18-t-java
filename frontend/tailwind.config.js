import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.7) 0%, rgba(255, 165, 0, 0.7) 100%)',
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
