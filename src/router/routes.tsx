import Layout from '@/components/Layout';
import { InsurancePage } from '@/pages/InsurancePage/InsurancePage';
import MainPage from '@/pages/MainPage';
import ModelPage from '@/pages/ModelPage';
import PositionPage from '@/pages/PositionPage';
import { Navigate, createHashRouter } from 'react-router-dom';
import { PathNames } from './pathNames';
import AdditionalPage from '@/pages/AdditionalPage';
import SummaryPage from '@/pages/SummaryPage';

const routes = createHashRouter([
	{
		path: PathNames.MAIN_PAGE,
		element: <Layout />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: PathNames.INSURANCE_PAGE, element: <InsurancePage /> },
			{ path: PathNames.GASOLINE_PAGE, element: <InsurancePage /> },
			{ path: PathNames.PARKING_PAGE, element: <InsurancePage /> },
			{ path: PathNames.SERVICE_PAGE, element: <InsurancePage /> },
			{
				path: PathNames.ORDER_PAGE,
				children: [
					{ index: true, element: <Navigate to={PathNames.POSITION_PAGE} /> },
					{ path: PathNames.POSITION_PAGE, element: <PositionPage /> },
					{ path: PathNames.MODEL_PAGE, element: <ModelPage /> },
					{ path: PathNames.ADDITIONAL_PAGE, element: <AdditionalPage /> },
					{ path: PathNames.SUMMARY_PAGE, element: <SummaryPage /> },
				],
			},
		],
	},
]);

export default routes;
