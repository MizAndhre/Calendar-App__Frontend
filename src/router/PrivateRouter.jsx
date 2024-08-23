import { useAuthStore } from '../hooks';

import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouter = () => {
	const { status } = useAuthStore();

	if (status === 'not-authenticated') {
		return <Navigate to={'/auth/login'} />;
	}

	return <Outlet />;
};
