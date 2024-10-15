
import { Dropdown, Input, MenuProps, Space } from 'antd';
import {  SearchOutlined, DownOutlined } from '@ant-design/icons';
import cn from 'classnames';
import Jingle from '@/assets/icons/Notifications.svg'
import { AuthService } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
	className?: string;
}


const items: MenuProps['items'] = [
	{
	  label: 'Выйти',
	  key: '0',
	//   onClick: () => {
	// 	  AuthService.logout()
	//   }
	},
];

export const Header = ({ className }: HeaderProps) => {
	return (
		<div
			className={cn(
				'relative w-full h-[68px] px-[22px] py-[12px] flex items-center justify-end shadow-header z-10',
				className
			)}
		>
			<div className="mr-auto w-full mr-5">
				<Input prefix={<SearchOutlined />} placeholder='Поиск...' className='border-none w-full'/>
			</div>
			<div className="flex items-center justify-center w-[70px] p-5 border-x border-[#CACEDB]">
				<Jingle className="cursor-pointer"/>
			</div>
			<div className="p-6">
				<Dropdown menu={{ items }} trigger={['click']} className='cursor-pointer'>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							Admin
							<DownOutlined />
						</Space>
					</a>
				</Dropdown>
			</div>
		</div>
	);
};
