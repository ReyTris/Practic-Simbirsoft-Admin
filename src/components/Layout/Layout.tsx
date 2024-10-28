import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { refreshToken } from '@/store/userSlice';
import Header from './Header';
import Footer from './Footer';
import Loader from '../ui/Loader';

export const Layout = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const { isLoading } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading]);

	useEffect(() => {
		if (localStorage.getItem('refreshToken')) {
			dispatch(refreshToken());
		} else {
			navigate('/auth/login');
		}
	}, [dispatch, navigate]);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-14">
				<Loader />
			</div>
		);
	}

	return (
		<main className="min-h-[100vh] flex  m-auto bg-[#F5F6F8]">
			<Sidebar />
			<div className="flex flex-col flex-grow w-wrapper">
				<Header />
				<div className="overflow-auto p-7 max-lg:p-4 bg-[#F5F6F8]">
					<Outlet />
				</div>
				<Footer />
			</div>
		</main>
	);
};
