import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../store/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/hooks';
import { RegisterFormData } from '@/types/auth';

interface Errors {
	firstName: boolean;
	lastName: boolean;
	email: boolean;
	password: boolean;
	birthDate: boolean;
	repearPassword: boolean;
}

export function RegisterForm() {
	const { authRegister } = useAuth();
	const navigate = useNavigate();
	const dispacth = useDispatch();
	const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const { loading, userInfo, error } = useSelector(state => state.user);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const handleToggleVisibility = (field: 'password' | 'confirmPassword') => {
		if (field === 'password') {
			setShowPassword(prevShowPassword => !prevShowPassword);
		} else if (field === 'confirmPassword') {
			setShowConfirmPassword(
				prevShowConfirmPassword => !prevShowConfirmPassword,
			);
		}
	};

	const [errors, setErrors] = useState<Errors>({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
		birthDate: false,
		repearPassword: false,
	});

	const validateForm = (data: RegisterFormData): boolean => {
		let validate = false;
		const { firstName, lastName, email, password, repeatPassword, birthDate } =
			data;
		if (!firstName || firstName?.length <= 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				firstName: true,
			}));
			validate = true;
		}
		if (!lastName || lastName?.length <= 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				lastName: true,
			}));
			validate = true;
		}
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
			setErrors(prevErrors => ({
				...prevErrors,
				email: true,
			}));
			validate = true;
		}
		if (
			!password
			// !/[A-Z]/.test(password) ||
			// !/\d/.test(password) ||
			// /[@$!%*?&.#]/.test(password) ||
			// !(password.length >= 5 && password.length <= 10)
		) {
			setErrors(prevErrors => ({
				...prevErrors,
				password: true,
			}));
			validate = true;
		}
		if (!repeatPassword || !(password === repeatPassword)) {
			setErrors(prevErrors => ({
				...prevErrors,
				repearPassword: true,
			}));
			validate = true;
		}
		if (!birthDate) {
			setErrors(prevErrors => ({
				...prevErrors,
				birthDate: true,
			}));
			validate = true;
		}
		return validate;
	};

	const handlerOnSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const repeatPassword = formData.get('repeatPassword') as string;
		const birthDate = formData.get('birthDate') as string;
		if (
			validateForm({
				firstName,
				lastName,
				email,
				password,
				repeatPassword,
				birthDate,
			})
		)
			return;
		authRegister({
			firstName,
			lastName,
			password,
			email,
			birthDate: new Date(birthDate),
		});
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center bg-teal-600 bg-opacity-20 border border-zinc-500 p-20 w-[668px] h-[990px]'>
				<h1 className='w-96 h-20 text-black text-4xl font-extrabold leading-9'>
					Registro
				</h1>
				<form
					className='w-96 flex flex-col gap-6'
					onSubmit={handlerOnSubmitRegister}
				>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Nombre(*)
						</label>
						<input
							type='text'
							name='firstName'
							placeholder='María'
							className='bg-white rounded-lg border border-black pl-5 pr-4 py-3 w-full text-black'
						/>
						{errors.firstName && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								Tu nombre debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Apellido(*)
						</label>
						<input
							type='text'
							name='lastName'
							placeholder='Gonzalez'
							className='bg-white rounded-lg border border-black pl-5 pr-4 py-3 w-full text-black'
						/>
						{errors.lastName && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								Tu apellido debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Correo Electrónico(*)
						</label>
						<input
							type='text'
							name='email'
							placeholder='ejemplo@gmail.com'
							className='bg-white rounded-lg border border-black pl-5 pr-4 py-3 w-full text-black'
						/>
						{errors.email && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								Ingresa un correo electrónico válido.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Fecha de nacimiento(*)
						</label>
						<input
							type='date'
							name='birthDate'
							className='bg-white rounded-lg border border-black pl-5 pr-4 py-3 w-full text-black'
						/>
						{errors.birthDate && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								Ingresa una fecha de nacimiento.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Contraseña(*)
						</label>
						<input
							type='password'
							name='password'
							placeholder='*************'
							className='bg-white rounded-lg border border-black pl-5 pr-4 py-3 w-full text-black'
						/>
						{errors.password && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								Ingresa una contraseña.
							</div>
							// <span>
							// 	<ul className='text-red-500 text-sm font-semibold ml-1'>
							// 		<li>La contraseña debe contener:</li>
							// 		{!/[A-Z]/.test(formData.password) && (
							// 			<li>❌Una letra mayúscula.</li>
							// 		)}
							// 		{!/\d/.test(formData.password) && <li>❌Un número.</li>}
							// 		{!/[@$!%*?&.#]/.test(formData.password) && (
							// 			<li>❌Un carácter especial: @$!%*?&.# </li>
							// 		)}
							// 		{!(
							// 			formData.password.length >= 6 &&
							// 			formData.password.length <= 10
							// 		) && <li>❌Entre 5 y 10 caracteres.</li>}
							// 	</ul>
							// </span>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Repetir Contraseña(*)
						</label>
						<input
							type='password'
							name='repeatPassword'
							placeholder='*************'
							className='bg-white rounded-lg border border-black pl-5 pr-4 py-3 w-full text-black'
						/>
						{errors.repearPassword && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								Las contraseñas no coinciden.
							</div>
						)}
					</div>
					<div className='w-96 h-7 text-white text-base font-bold leading-9 flex gap-2 justify-center items-center'>
						<input type='checkbox' />
						<label htmlFor=''>Acepto Términos y Condiciones</label>
					</div>
					<button className='w-96 h-14 px-7 py-3 bg-white rounded-lg shadow shadow-inner border border-black text-center text-black text-lg font-bold leading-normal'>
						Registrarse
					</button>
				</form>
				<div className='mt-4'>
					<div className='flex flex-col items-center text-white'>
						<Link to={'/login'}>Iniciar sesión</Link>
					</div>
				</div>
			</div>
		</>
	);

	// return (
	//   <div>
	//     <form onSubmit={handleSubmit} className='p-8'>
	//       <div>
	//         <div>
	//           <input
	//             type='text'
	//             id='name'
	//             name='name'
	//             value={formData.name}
	//             onChange={handleChange}
	//             placeholder='Tu Nombre'
	//             required
	//             className="w-64 p-2 border border-gray-300 rounded mb-2"
	//           />
	//         </div>
	//           {errors.name && (
	//             <div className="text-red-500 text-sm font-semibold ml-1">
	//               Tu nombre debe tener al menos 3 caracteres.
	//             </div>
	//           )}

	//         <div>
	//           <input
	//             type='text'
	//             id='lastName'
	//             name='lastName'
	//             value={formData.lastName}
	//             onChange={handleChange}
	//             placeholder='Tu Apellido'
	//             required
	//             className="w-64 p-2 border border-gray-300 rounded mb-2"
	//           />
	//         </div>
	//       </div>
	//           {errors.lastName && (
	//             <div className="text-red-500 text-sm font-semibold ml-1">
	//               Tu apellido debe tener al menos 3 caracteres.
	//             </div>
	//           )}

	//       <div>
	//         <input
	//           type='email'
	//           id='email'
	//           name='email'
	//           value={formData.email}
	//           onChange={handleChange}
	//           placeholder='Email'
	//           required
	//           className="w-64 p-2 border border-gray-300 rounded mb-2"
	//         />
	//         {/* {errorMessage && error && (
	//             <span className="text-red-500">
	//             {errorMessage} <Link to={'/login'}>Inicia Sesión</Link>
	//             </span>
	//           )} */}
	//       </div>
	//           {errors.email && (
	//             <div className="text-red-500 text-sm font-semibold ml-1">
	//               Ingresa un Correo Electrónico válido.
	//             </div>
	//           )}

	//       <div>
	//         <input
	//           type='date'
	//           id='dateOfBirth'
	//           name='dateOfBirth'
	//           value={formData.dateOfBirth}
	//           onChange={handleChange}
	//           placeholder='Fecha de Nacimiento'
	//           required
	//           className="w-64 p-2 border border-gray-300 rounded mb-2 h-10"
	//         />
	//       </div>

	//       <div className="flex border border-gray-300 rounded mb-2">
	//         <input
	//           type={showPassword ? 'text' : 'password'}
	//           id='password'
	//           name='password'
	//           value={formData.password}
	//           onChange={handleChange}
	//           placeholder='Contraseña'
	//           required
	//           className="w-56 p-2 rounded-l h-10 focus:outline-none"
	//         />
	//         <button
	//           type='button'
	//           onClick={() => handleToggleVisibility('password')}
	//           className="h-10 w-8"
	//         >
	//           {showPassword
	//             ? <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" className="w-5" alt="Visible" />
	//             : <img src="https://cdn-icons-png.flaticon.com/512/2767/2767146.png" className="w-5" alt="No Visible" />}
	//         </button>
	//       </div>

	//       {errors.password && (
	//           <span>
	//           <ul className="text-red-500 text-sm font-semibold ml-1">
	//               <li>La contraseña debe contener:</li>
	//             {!/[A-Z]/.test(formData.password) && <li>❌Una letra mayúscula.</li>}
	//             {!/\d/.test(formData.password) && <li>❌Un número.</li>}
	//             {!/[@$!%*?&.#]/.test(formData.password) && <li>❌Un carácter especial: @$!%*?&.# </li>}
	//             {!(formData.password.length >= 6 && formData.password.length <= 10) && <li>❌Entre 5 y 10 caracteres.</li>}
	//           </ul>
	//           </span>
	//         )}

	//       <div className="flex border border-gray-300 rounded mb-2 h1-10">
	//           <input
	//               type={showConfirmPassword ? 'text' : 'password'}
	//               id='confirmPassword'
	//               name='confirmPassword'
	//               value={formData.confirmPassword}
	//               onChange={handleChange}
	//               placeholder='Confirmar Contraseña'
	//               required
	//               className="w-56 p-2 rounded-l h-10 focus:outline-none"
	//           />
	//           <button
	//               type='button'
	//               onClick={() => handleToggleVisibility('confirmPassword')}
	//               className="h-10 w-8"
	//           >
	//               {showConfirmPassword
	//               ? <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" className="w-5" alt="Visible" />
	//               : <img src="https://cdn-icons-png.flaticon.com/512/2767/2767146.png" className="w-5" alt="No Visible" />}
	//           </button>
	//       </div>
	//         {errors.confirmPassword && (
	//           <div className="text-red-500 text-sm font-semibold ml-1">
	//             Las contraseñas no coinciden.
	//           </div>
	//         )}

	//       <button
	//         type='submit'
	//         className="bg-gray-500 w-64 p-2 rounded text-white mt-4"
	//         disabled={
	//           errors.name ||
	//           errors.lastName ||
	//           errors.email ||
	//           errors.password ||
	//           errors.confirmPassword ||
	//           errors.dateOfBirth ||
	//           isSubmitting ||
	//           isCreatingAccount
	//         }
	//       >
	//         Registro
	//       </button>
	//     </form>
	//     {loading && <img src="https://i.gifer.com/ZKZg.gif"/>}
	//           {error && <p className='text-red-500 text-sm font-semibold ml-1'>Error: {error}</p>}
	//           {userInfo && <p className='text-green-500 text-sm font-semibold ml-1'>Registro Exitoso! Bienvenid@, {userInfo.name}!</p>}
	//   </div>
	// );
}
