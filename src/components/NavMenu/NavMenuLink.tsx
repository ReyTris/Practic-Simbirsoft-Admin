import { NavLink } from 'react-router-dom';
import { INavMenuLink } from '../types/navMenu';
import * as styles from './NavMenu.module.scss';

export const NavMenuLink = ({ title, link, onClick }: INavMenuLink) => {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`${styles.navMenu__link} ${isActive ? styles.active : ''}`
			}
			onClick={onClick}
		>
			{title}
		</NavLink>
	);
};
