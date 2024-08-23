import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../apis';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';

export const useAuthStore = () => {
	const dispatch = useDispatch();
	const { status, user, errorMessage } = useSelector((state) => state.auth);

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());

		try {
			const resp = await calendarApi.post('/auth', { email, password });
			const { data } = resp;

			localStorage.setItem('token', data.token);
			localStorage.setItem('token/init/date', new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout('Los datos ingresados no son correctos'));

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());

		try {
			const resp = await calendarApi.post('/auth/new', { name, email, password });
			const { data } = resp;

			localStorage.setItem('token', data.token);
			localStorage.setItem('token/init/date', new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			let errorMessage = '';

			errorMessage = error.response.data?.msg;

			if (error.response.data?.errors) {
				errorMessage = Object.values(error.response.data.errors)
					.map((e) => e.msg)
					.join('. ');
			}

			dispatch(onLogout(errorMessage));

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	//used in AppRouter
	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');

		if (!token) return dispatch(onLogout());

		try {
			const resp = await calendarApi.get('/auth/renew');

			const { data } = resp;

			localStorage.setItem('token', data.token);
			localStorage.setItem('token/init/date', new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			console.log({ error });

			localStorage.clear();
			dispatch(onLogout());
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch(onLogout());
		dispatch(onLogoutCalendar());
	};

	return {
		//Properties
		status,
		user,
		errorMessage,

		// Methods
		startLogin,
		startRegister,
		checkAuthToken,
		startLogout,
	};
};
