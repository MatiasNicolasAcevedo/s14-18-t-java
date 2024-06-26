import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit', // habilita el modo JIT
	purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1000px',
			xl: '1024px',
			'2xl': '1500px',
		},
		extend: {
			boxShadow: {
				custom:
					'8px 8px 16px 0px rgba(107, 38, 128, 0.60), -2px -2px 16px 0px #D2B1DB inset, -4px -4px 10px 0px #8D3DA5 inset',
					'custom-inner': '1px 2px 7px 0px rgba(0, 0, 0, 0.25) inset',
			},
			backdropFilter: {
				none: 'none',
				blur: 'blur(15px)',
			},
			maxWidth: {
				sm: '480px',
				md: '768px',
				lg: '976px',
				xl: '1440px',
			},
			zIndex: {
				1: '1',
				2: '2',
			},
			colors: {
				'gray-400': '#9CA3AF',
				'zinc-500':'#838383',
				'teal-600': '#0C9595',
				'custom-purple': '#8D3DA5',
				'custom-pink': '#f77fb9',
				'cool-gray-900': '#111827',
				'custom-blue': '#abb0eb',
				'custom-dark': '#374151',
				'custom-violate': '#ae75e4',
			},
			fontFamily: {
				'Montserrat Alternates': ['Montserrat Alternates', 'sans-serif'],
				Nunito: ['Nunito'],
				Inter: ['Inter'],
			},
			fontSize: {
				xs: '10px', // Extra pequeño
				sm: '14px', // Pequeño
				base: '16px', // Tamaño base (normal)
				lg: '18px', // Grande
				xl: '32px', // Extra grande
				//2xl: '64px', // Doble extra grande
				// Agrega más tamaños de texto personalizados si es necesario
			},
			borderRadius: {
				'50p': '50%',
				'10p': '80px',
			},
			backgroundImage: {
				'transparent-bubble': "url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1714011725/Group_1000004301_hnmyxi.svg')",
				'fichas': "url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713911970/Fichas_i9l8c6.svg')",
				'login-register': "url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713911965/Register-frame_ifhb5x.svg')",
				'roulette-dashboard':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713889478/ruleta-min_yiakyf.png')",
				'roulette-lose':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713889478/ruleta_PERDISTE-min_f5vww3.png')",
				'roulette-win':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713889478/ruleta_Ganaste-min_stmlpg.png')",
				'blog-background':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713744016/Frame_63-min_zcpmck.png')",
				'dice-background':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713655396/image_62_vvlcov.png')",
				'dashboard-background':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713486827/LANDING_14_3_-min_ozbkmp.png')",
				'joystick-land3':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713478927/Group_1000004354-min_spicix.png')",
				'landing-1':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713486393/LANDING_14_6_-min_jiuh9i.png')",
				'landing-2':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713492707/LANDING_14_1_-min_gwbqea.png')",
				'landing-3':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713486825/LANDING_14_2_-min_imxvlz.png')",
				'landing-4':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713486621/LANDING_14-min_omw6b9.png')",
				'landing-5':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713487123/contacto_1_-min_u24ot9.png')",
				'card-roll':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713288751/Group_1000004326-min_weetqq.png')",
				'card-ruleta':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713281902/Group_1000004324-min_bzyrgg.png')",
				'login-r':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713486621/LANDING_14-min_omw6b9.png')",
				'chat-landing3':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1713478927/Chat-min_igthn1.png')",
				'aware-pattern':
					"url('https://res.cloudinary.com/dnxjwcku6/image/upload/v1714005129/foro_3-min_bejggi.png')",
				'spin-wise':
					' url(https://res.cloudinary.com/dnxjwcku6/image/upload/v1713555467/AwareGaming/Group_1000004299-min_1_cczntx.png)',
			},
			daisyui: {
				themes: [
					{
						mytheme: {
							primary: '#f3f4f6',
							secondary: '#dc8400',
							accent: '#953300',
							neutral: '#292929',
							'base-100': '#fce7f3',
							info: '#00b9ff',
							success: '#66c800',
							warning: '#ffa512',
							error: '#ff7b81',
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
	plugins: [daisyui],
};
