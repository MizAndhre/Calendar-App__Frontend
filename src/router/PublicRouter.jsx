import { useAuthStore } from '../hooks';

import { Navigate, Outlet } from 'react-router-dom';

export const PublicRouter = () => {
	const { status } = useAuthStore();

	if (status === 'authenticated') {
		return <Navigate to={'/'} />;
	}

	return <Outlet />;
};
