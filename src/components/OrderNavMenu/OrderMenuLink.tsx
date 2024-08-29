import { NavLink } from 'react-router-dom';
import { IOrderMenuLink } from '../types/navMenu';

export const OrderMenuLink = ({ title, link, isActived }: IOrderMenuLink) => {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`hover:text-main text-black  ${isActive ? 'text-main' : ''} ${
					isActived ? 'pointer-events-auto' : 'pointer-events-none opacity-50'
				}`
			}
		>
			{title}
		</NavLink>
	);
};
