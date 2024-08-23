import { useEffect } from 'react';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

import { useAuthStore } from '../hooks';

import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {
	const { status, checkAuthToken } = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	if (status === 'checking') {
		// TODO: CAMBIAR EL COMPONENTE DE CARGA
		return <h3>Cargando...</h3>;
	}

	const router = createBrowserRouter([
		{
			path: '/',
			element: <PrivateRouter />,
			children: [
				{
					index: true,
					element: <CalendarPage />,
				},
				{
					path: '*',
					element: <Navigate to={'/'} />,
				},
			],
		},
		{
			path: '/auth',
			element: <PublicRouter />,
			children: [
				{
					path: 'login',
					element: <LoginPage />,
				},
				{
					path: '*',
					element: <Navigate to={'/auth/login'} />,
				},
			],
		},
		{
			path: '/*',
			element: <Navigate to={'/'} />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
