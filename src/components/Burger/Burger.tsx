import cn from 'classnames';
import * as styles from './Burger.module.scss';

interface IBurgerProps {
	handlerNavMenu: () => void;
	isOpen: boolean;
}

export const Burger = ({ handlerNavMenu, isOpen }: IBurgerProps) => {
	return (
		<div
			className={cn(styles.burger, { [styles.open]: isOpen })}
			onClick={handlerNavMenu}
		>
			<div className={styles.burger__line}></div>
			<div className={styles.burger__line}></div>
			<div className={styles.burger__line}></div>
		</div>
	);
};
