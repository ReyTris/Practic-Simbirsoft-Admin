import Layout from '@/components/Layout';
import MainPage from '@/pages/MainPage';
import { createHashRouter, Navigate } from 'react-router-dom';
import { PathNames } from './pathNames';
import AuthPage from '@/pages/AuthPage';
import Login from '@/pages/AuthPage/components/Login';

const routes = createHashRouter([
	{
		path: PathNames.MAIN_PAGE,
		element: <Layout />,
		children: [{ index: true, element: <MainPage /> }],
	},
	{
		path: PathNames.AUTH_PAGE,
		element: <AuthPage />,
		children: [
			{ index: true, element: <Navigate to={PathNames.LOGIN_PAGE} /> },
			{ path: PathNames.LOGIN_PAGE, element: <Login /> },
		],
	},
]);

export default routes;
