import { Outlet } from 'react-router-dom';

import MainLogo from '@/assets/icons/main.svg';

export const AuthPage = () => {
	return (
		<div className="bg-[#F5F6F8] w-[100vw] h-[100vh] flex justify-center items-center">
			<div className="w-[376px] flex flex-col items-center">
				<div>
					<MainLogo />
				</div>
				<div className="p-5 w-full mt-4 bg-white rounded-2xl shadow-md">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
