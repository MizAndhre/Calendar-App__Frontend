import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
};

const registerFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerPassword2: '',
};

export const LoginPage = () => {
	const { startLogin, startRegister, errorMessage } = useAuthStore();

	const {
		loginEmail,
		loginPassword,
		handleInputChange: handleLoginInputChange,
	} = useForm(loginFormFields);

	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		handleInputChange: handleRegisterInputChange,
	} = useForm(registerFormFields);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	const handleRegisterSubmit = (e) => {
		e.preventDefault();

		if (registerPassword !== registerPassword2) {
			Swal.fire('Error en el Registro', 'Las contraseñas no son iguales', 'error');
			return;
		}

		startRegister({
			name: registerName,
			email: registerEmail,
			password: registerPassword,
		});
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Error en el Inicio de Sesión', errorMessage, 'error');
		}
	}, [errorMessage]);

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={handleLoginSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="loginEmail"
								value={loginEmail}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="loginPassword"
								value={loginPassword}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input type="submit" className="btnSubmit" value="Login" />
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={handleRegisterSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="registerName"
								value={registerName}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="registerEmail"
								value={registerEmail}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="registerPassword"
								value={registerPassword}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="registerPassword2"
								value={registerPassword2}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className="form-group mb-2">
							<input type="submit" className="btnSubmit" value="Crear cuenta" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
