import { PathNames } from '@/router/pathNames';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export const Layout = () => {
	const location = useLocation();
	const path = location.pathname;
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handlerNavMenu = () => {
		setShowMenu(prev => !prev);
	};

	return (
		<main className='min-h-[100vh] flex overflow-hidden m-auto'>
			<Sidebar isBurgerOpen={showMenu} handlerNavMenu={handlerNavMenu} />
			<div className='flex-grow w-wrapper'>
				<Outlet />
			</div>
		</main>
	);
};
