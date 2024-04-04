import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../store/users/actions';
import { useDispatch, useSelector } from 'react-redux';

interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  confirmPassword: string;
}

interface Errors {
  name: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  dateOfBirth: boolean;
  confirmPassword: boolean;
}

const RegisterForm = () => {
//   const [error] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispacth = useDispatch()
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { loading, userInfo, error } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const handleToggleVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(prevShowPassword => !prevShowPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({
    name: false,
    lastName: false,
    email: false,
    password: false,
    dateOfBirth: false,
    confirmPassword: false,
  });

//   const [errorMessage] = useState<string>('');

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsCreatingAccount(true);
    setIsSubmitting(true); 
    try {
        console.log("mando info :", formData)
        dispacth(register(formData));
        setIsSubmitting(false); 
        setIsCreatingAccount(false);
        if (userInfo) {
            toast.success('¡Registro exitoso!')
            navigate('/login');
        } else {
            toast.error('Ocurrió un error inesperado. Vuelve a intentarlo');
            navigate('/register');
        }
    } catch (error) {
        setIsSubmitting(false); 
        toast.error('Ocurrió un error inesperado. Comprueba los datos en el formulario');
    }
};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'name' || name === 'lastName') {
      const minLength = value.trim().length >= 3;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !minLength,
      }));
    } else if (name === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value),
      }));
    } else if (name === 'password') {
      const hasCapital = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&.#]/.test(value);
      const minLength = value.length >= 5 && value.length <= 10;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: !hasCapital || !hasNumber || !hasSpecialChar || !minLength || value.trim().length < 6,
      }));
    } else if (name === 'confirmPassword') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: value !== formData.password,
      }));
    } else if (name === 'dateOfBirth') {
        const currentDate = new Date();
        const dob = new Date(value);
        const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth: dob >= eighteenYearsAgo,
        }));
        if (dob >= eighteenYearsAgo) {
          toast.error('Debes ser mayor de 18 años para registrarte.');
        
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='p-8'>
        <div>
          <div>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Tu Nombre'
              required
              className="w-64 p-2 border border-gray-300 rounded mb-2"
            />
          </div>
            {errors.name && (
              <div className="text-red-500 text-sm font-semibold ml-1">
                Tu nombre debe tener al menos 3 caracteres.
              </div>
            )}

          <div>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              placeholder='Tu Apellido'
              required
              className="w-64 p-2 border border-gray-300 rounded mb-2"
            />
          </div>
        </div>
            {errors.lastName && (
              <div className="text-red-500 text-sm font-semibold ml-1">
                Tu apellido debe tener al menos 3 caracteres.
              </div>
            )}

        <div>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
            className="w-64 p-2 border border-gray-300 rounded mb-2"
          />
          {/* {errorMessage && error && (
              <span className="text-red-500">
              {errorMessage} <Link to={'/login'}>Inicia Sesión</Link>
              </span>
            )} */}
        </div>
            {errors.email && (
              <div className="text-red-500 text-sm font-semibold ml-1">
                Ingresa un Correo Electrónico válido.
              </div>
            )}

        <div>
          <input
            type='date'
            id='dateOfBirth'
            name='dateOfBirth'
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder='Fecha de Nacimiento'
            required
            className="w-64 p-2 border border-gray-300 rounded mb-2 h-10"
          />
        </div>

        <div className="flex border border-gray-300 rounded mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Contraseña'
            required
            className="w-56 p-2 rounded-l h-10 focus:outline-none"
          />
          <button
            type='button'
            onClick={() => handleToggleVisibility('password')}
            className="h-10 w-8"
          >
            {showPassword
              ? <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" className="w-5" alt="Visible" />
              : <img src="https://cdn-icons-png.flaticon.com/512/2767/2767146.png" className="w-5" alt="No Visible" />}
          </button>
        </div>

        {errors.password && (
            <span>
            <ul className="text-red-500 text-sm font-semibold ml-1">
                <li>La contraseña debe contener:</li>
              {!/[A-Z]/.test(formData.password) && <li>❌Una letra mayúscula.</li>}
              {!/\d/.test(formData.password) && <li>❌Un número.</li>}
              {!/[@$!%*?&.#]/.test(formData.password) && <li>❌Un carácter especial: @$!%*?&.# </li>}
              {!(formData.password.length >= 6 && formData.password.length <= 10) && <li>❌Entre 5 y 10 caracteres.</li>}
            </ul>
            </span>
          )}

        <div className="flex border border-gray-300 rounded mb-2 h1-10">
            <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirmar Contraseña'
                required
                className="w-56 p-2 rounded-l h-10 focus:outline-none"
            />
            <button
                type='button'
                onClick={() => handleToggleVisibility('confirmPassword')}
                className="h-10 w-8"
            >
                {showConfirmPassword
                ? <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" className="w-5" alt="Visible" />
                : <img src="https://cdn-icons-png.flaticon.com/512/2767/2767146.png" className="w-5" alt="No Visible" />}
            </button>
        </div>
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm font-semibold ml-1">
              Las contraseñas no coinciden.
            </div>
          )}

        <button
          type='submit'
          className="bg-gray-500 w-64 p-2 rounded text-white mt-4"
          disabled={
            errors.name ||
            errors.lastName ||
            errors.email ||
            errors.password ||
            errors.confirmPassword ||
            errors.dateOfBirth ||
            isSubmitting ||
            isCreatingAccount
          }
        >
          Registro
        </button>
      </form>
      {loading && <img src="https://i.gifer.com/ZKZg.gif"/>}
            {error && <p className='text-red-500 text-sm font-semibold ml-1'>Error: {error}</p>}
            {userInfo && <p className='text-green-500 text-sm font-semibold ml-1'>Registro Exitoso! Bienvenid@, {userInfo.name}!</p>}
    </div>
  );
};

export default RegisterForm;
