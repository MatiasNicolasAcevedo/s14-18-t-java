import { useState, FormEvent } from 'react';
import { useUser } from '@/hooks';
import { RegisterFormData } from '@/types/auth';

interface Errors {
	firstName: boolean;
	lastName: boolean;
	dni: boolean;
	password: boolean;
}

interface Props {
	toggleProfile: () => void;
}

export default function ProfileEditForm({ toggleProfile }: Props) {
	const [errors, setErrors] = useState<Errors>({
		firstName: false,
		lastName: false,
		dni: false,
		password: false,
	});
	const { user, updateUser } = useUser();

	const validateForm = ({
		firstName,
		lastName,
		dni,
		password,
	}: RegisterFormData): boolean => {
		let validate = false;
		setErrors({
			firstName: false,
			lastName: false,
			dni: false,
			password: false,
		});
		if (!firstName || firstName.length <= 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				firstName: true,
			}));
			validate = true;
		}
		if (!lastName || lastName.length <= 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				lastName: true,
			}));
			validate = true;
		}
		if (!dni) {
			setErrors(prevErrors => ({
				...prevErrors,
				dni: true,
			}));
			validate = true;
		}
		if (password) {
			if (
				!/[A-Z]/.test(password) ||
				!/\d/.test(password) ||
				!(password.length >= 5 && password.length <= 10)
			) {
				setErrors(prevErrors => ({
					...prevErrors,
					password: true,
				}));
				validate = true;
			}
		}
		return validate;
	};

	const handleSubmitUpdateUser = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const dni = formData.get('dni') as string;
		const password = formData.get('password') as string;

		if (
			validateForm({
				firstName,
				lastName,
				dni,
				password,
			})
		)
			return;

		updateUser({
			firstName,
			lastName,
			dni,
			password,
		});
		toggleProfile();
	};

	return (
		<>
			<div className='flex flex-col gap-3 w-1/2 items-center space-y-2 justify-centerbg  bg-teal-600 bg-opacity-20 rounded-[20px] backdrop-blur-[30px] py-20 px-5'>
				<div className='w-full text-left'>
					<h1 className='text-black text-[32px] font-bold font-xl'>Perfil</h1>
				</div>
				<form
					className='w-full flex flex-col gap-6'
					onSubmit={handleSubmitUpdateUser}
				>
					<div className=' flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='firstName'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							Nombre(*)
						</label>
						<input
							id='firstName'
							type='text'
							name='firstName'
							placeholder='Juan Martín'
							defaultValue={user.firstName}
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${
								errors.firstName
									? 'border-red-500 border-[3px]'
									: 'border border-black'
							}`}
						/>
						{errors.firstName && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Tu nombre debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
					<div className=' flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='lastName'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							Apellido(*)
						</label>
						<input
							id='lastName'
							type='text'
							name='lastName'
							placeholder='Gonzalez'
							defaultValue={user.lastName}
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.lastName ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.lastName && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Tu apellido debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
					<div className=' flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='DNI'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							DNI(*)
						</label>
						<input
							id='DNI'
							type='number'
							name='dni'
							placeholder='12345678'
							step='1'
							defaultValue={user.dni}
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.dni ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.dni && (
							<div className='text-gray-900 text-sm font-bold font-nunito leading-normal'>
								❌ Ingresa tu DNI.
							</div>
						)}
					</div>
					<div className=' flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='password'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							Contraseña(*)
						</label>
						<input
							id='password'
							type='password'
							name='password'
							placeholder='*************'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.password ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.password && (
							<span>
								<ul className='text-black text-sm font-semibold ml-1'>
									<li>❌ La contraseña debe contener:</li>
									<li className='pl-6'>Una letra mayúscula.</li>
									<li className='pl-6'>Un número.</li>
									<li className='pl-6'>Entre 5 y 10 caracteres.</li>
								</ul>
							</span>
						)}
					</div>
					<div className='flex justify-end w-full gap-3'>
						<button
							type='button'
							className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2 text-gray-800 text-sm font-bold font-Nunito leading-tight'
							onClick={toggleProfile}
						>
							Cancelar
						</button>
						<button
							type='submit'
							className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2'
						>
							<div className='text-gray-800 text-sm font-bold font-Nunito leading-tight'>
								Editar
							</div>
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
