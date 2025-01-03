import { ApartmentOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import type { GetProp, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { PathNames } from '@/router/pathNames';
import { getLastPathPart } from '@/features/getLastPathPart';

import { OrderedListOutlined } from '@ant-design/icons';
import { CarOutlined } from '@ant-design/icons';

import MainLogo from '@/assets/icons/main.svg';

type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
	{
		key: PathNames.CAR_INFO_PAGE,
		icon: <CarOutlined />,
		label: 'Карточка автомобиля',
	},
	{
		key: PathNames.ORDERS_PAGE,
		icon: <OrderedListOutlined />,
		label: 'Заказы',
	},
	{
		key: PathNames.LIST_CARS_PAGE,
		icon: <ApartmentOutlined />,
		label: 'Список автомобилей',
	},
];

export const Sidebar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const selectedKey = getLastPathPart(pathname);

	return (
		<div className="w-[300px] max-lg:w-[50px] h-[100vh] flex flex-col items-center shadow-sidebar z-10 bg-white">
			<div className="h-[70px] w-full flex items-center pl-12">
				<MainLogo className="max-lg:hidden" />
			</div>

			<ConfigProvider
				theme={{
					components: {
						Menu: {
							itemSelectedBg: 'white',
						},
					},
				}}
			>
				<Menu
					onClick={({ key }) => navigate(key)}
					selectedKeys={[selectedKey]}
					items={items}
					className="w-full"
				/>
			</ConfigProvider>
		</div>
	);
};
