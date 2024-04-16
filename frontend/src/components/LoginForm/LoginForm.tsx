import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../store/users/actions';
import { useDispatch, useSelector } from 'react-redux';

interface FormData {
	email: string;
	password: string;
}

interface Errors {
	email: boolean;
	password: boolean;
}

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { loading, userInfo, error } = useSelector(state => state.user);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const handleToggleVisibility = () => {
		setShowPassword(prevShowPassword => !prevShowPassword);
	};

	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState<Errors>({
		email: false,
		password: false,
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			dispatch(login(formData));
			setIsSubmitting(false);
			if (userInfo) {
				toast.success('¡Inicio de sesión exitoso!');
				navigate('/home');
			} else {
				toast.error('Ocurrió un error inesperado. Vuelve a intentarlo');
				navigate('/login');
			}
		} catch (error) {
			setIsSubmitting(false);
			toast.error(
				'Ocurrió un error inesperado. Comprueba los datos en el formulario',
			);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}));
		if (name === 'email') {
			setErrors(prevErrors => ({
				...prevErrors,
				email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value),
			}));
		} else if (name === 'password') {
			setErrors(prevErrors => ({
				...prevErrors,
				password: value.trim().length < 6,
			}));
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='p-8 relative z-20'
			>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Correo Electrónico
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						placeholder='ejemplo@gmail.com'
						required
						className='w-64 p-2 border border-blue-500 rounded-lg bg-white mb-2'
					/>
				</div>
				{errors.email && (
					<div className='text-red-500 text-sm font-semibold ml-1'>
						Ingresa un Correo Electrónico válido.
					</div>
				)}
				<label
					htmlFor='password'
					className='block text-sm font-medium text-gray-700'
				>
					Contraseña
				</label>
				<div className='flex border border-blue-500 rounded-lg bg-white mb-2'>
					<input
						type={showPassword ? 'text' : 'password'}
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						placeholder='Contraseña'
						required
						className='w-56 p-2 rounded-l h-10 focus:outline-none  bg-white'
					/>
					<button
						type='button'
						onClick={handleToggleVisibility}
						className='h-10 w-8'
					>
						{showPassword ? (
							<img
								src='https://cdn-icons-png.flaticon.com/512/709/709612.png'
								className='w-5'
								alt='Visible'
							/>
						) : (
							<img
								src='https://cdn-icons-png.flaticon.com/512/2767/2767146.png'
								className='w-5'
								alt='No Visible'
							/>
						)}
					</button>
				</div>
				{errors.password && (
					<div className='text-red-500 text-sm font-semibold ml-1'>
						La contraseña debe tener al menos 6 caracteres.
					</div>
				)}

				<button
					type='submit'
					className='bg-white w-64 p-2 rounded-lg text-black mt-4 shadow-custom'
					disabled={errors.email || errors.password || isSubmitting}
				>
					Iniciar Sesión
				</button>
			</form>
			{loading && (
				<img
					alt='loading'
					src='https://i.gifer.com/ZKZg.gif'
				/>
			)}
			{error && (
				<p className='text-red-500 text-sm font-semibold ml-1'>
					Error: {error}
				</p>
			)}
			{userInfo && (
				<p className='text-green-500 text-sm font-semibold ml-1'>
					¡Inicio de sesión exitoso! Bienvenid@, {userInfo.name}!
				</p>
			)}
		</div>
	);
};

export default LoginForm;
