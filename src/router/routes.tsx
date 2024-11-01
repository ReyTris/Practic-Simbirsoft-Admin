import Layout from '@/components/Layout';
import { createHashRouter, Navigate } from 'react-router-dom';
import { PathNames } from './pathNames';
import AuthPage from '@/pages/AuthPage';
import Login from '@/pages/AuthPage/components/Login';
import OrdersPage from '@/pages/OrdersPage';
import CarInfoPage from '@/pages/CarInfoPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import ListCarsPage from '@/pages/ListCarsPage';

const routes = createHashRouter([
	{
		path: PathNames.MAIN_PAGE,
		element: <Layout />,
		children: [
			{ index: true, element: <Navigate to={PathNames.ORDERS_PAGE} /> },
			{ path: PathNames.ORDERS_PAGE, element: <OrdersPage /> },
			{
				path: `${PathNames.CAR_INFO_PAGE}/:id?`,
				element: <CarInfoPage />,
			},
			{
				path: `${PathNames.LIST_CARS_PAGE}`,
				element: <ListCarsPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
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
