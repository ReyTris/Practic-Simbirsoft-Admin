import { Dropdown, Input, MenuProps, Space } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import cn from 'classnames';
import Jingle from '@/assets/icons/Notifications.svg';
import { AuthService } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
	className?: string;
}

const items: MenuProps['items'] = [
	{
		label: 'Выйти',
		key: '0',
		onClick: () => {
			AuthService.logout();
		},
	},
];

export const Header = ({ className }: HeaderProps) => {
	return (
		<div
			className={cn(
				'relative w-full h-[68px] px-[22px] py-[12px] flex items-center justify-end shadow-header z-10 bg-white',
				className
			)}
		>
			<div className="w-full mr-5">
				<Input
					prefix={<SearchOutlined />}
					placeholder="Поиск..."
					className="border-none w-full"
				/>
			</div>
			<div className="flex items-center justify-center w-[70px] p-5 max-md:p-2 border-x border-[#CACEDB]">
				<Jingle className="cursor-pointer" />
			</div>
			<div className="p-6 max-md:p-2">
				<Dropdown
					menu={{ items }}
					trigger={['click']}
					className="cursor-pointer"
				>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							<div className="w-[40px] h-[40px] rounded-full max-md:w-[0]">
								<img
									className=" w-full h-full object-cover rounded-full"
									src="../../../assets/images/user-avatar.png"
									alt=""
								/>
							</div>
							Admin
							<DownOutlined />
						</Space>
					</a>
				</Dropdown>
			</div>
		</div>
	);
};
