import { dataNavMenu, socialLinks } from '@/constants/nav-menu-data';
import { Button } from '../ui/Button';
import * as styles from './NavMenu.module.scss';
import { NavMenuLink } from './NavMenuLink';

interface NavMenuProps {
	handlerNavMenu: () => void;
}

const NavMenu = ({ handlerNavMenu }: NavMenuProps) => {
	const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
		const targetElement = event.currentTarget;
		if (!targetElement.closest(`.${styles.navMenu}`)) {
			handlerNavMenu();
		}
	};
	return (
		<div className={styles.navMenuWrapper} onClick={handleMenuClose}>
			<div className={styles.navMenu}>
				<nav className={styles.navMenu__nav}>
					<ul className={styles.navMenu__list}>
						{dataNavMenu.map(({ title, link }) => {
							return (
								<li key={title}>
									<NavMenuLink
										title={title}
										link={link}
										onClick={handlerNavMenu}
									/>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className={styles.socialList}>
					{socialLinks.map(({ link, icon: IconComponent }, index) => (
						<Button key={index} to={link} className={styles.socialList__item}>
							<IconComponent />
						</Button>
					))}
				</div>
				<Button className='hidden p-0 mt-auto max-lg:block text-main'>
					Eng
				</Button>
			</div>
		</div>
	);
};

export default NavMenu;
