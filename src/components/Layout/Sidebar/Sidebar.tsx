import {
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {  Menu } from 'antd';
import type { GetProp, MenuProps } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PathNames } from '@/router/pathNames';
import { getLastPathPart } from '@/features/getLastPathPart';

import MainLogo from '@/assets/icons/main.svg'


type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
	{
		key: PathNames.ORDERS_PAGE,
		icon: <LinkOutlined />,
		label: 'Заказы',
	},
	{
		key: PathNames.ENTITIES_PAGE,
		icon: <MailOutlined />,
		label: 'Сущности',
	},
	{
		key: '2',
		icon: <CalendarOutlined />,
		label: 'Navigation Two',
	},
];


export const Sidebar = () => {
	
	const {pathname} = useLocation()
	const navigate = useNavigate()
	const selectedKey = getLastPathPart(pathname);
	
	return (
		<div className='w-[300px] h-[100vh] flex flex-col items-center shadow-sidebar'>
			<div className='h-[70px] w-full flex items-center justify-center'>
				<MainLogo />
			</div>
			<Menu
				onClick={({key}) => navigate(key)}
				selectedKeys={[selectedKey]}
				items={items}
				className='w-[300px]'
			/>
		</div>
	);
};