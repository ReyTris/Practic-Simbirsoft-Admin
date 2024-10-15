import { PathNames } from '@/router/pathNames';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { refreshToken } from '@/store/userSlice';
import Header from './Header';

export const Layout = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)

	const { isLoading} = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		setLoading(isLoading)
	}, [isLoading])

	useEffect(() => {
		if(localStorage.getItem('refreshToken')) {
			dispatch(refreshToken())
		} else {
			navigate('/auth/login');
		}
	}, [ dispatch, navigate])

	if (loading) {
		return '...Загрузка'
	}

	return (
		<main className='min-h-[100vh] flex overflow-hidden m-auto'>
			<Sidebar/>
			<div className='flex-grow w-wrapper'>
				<Header/>
				<div className="h-full p-7 bg-[#F5F6F8]">
					<Outlet />
				</div>
			</div>
		</main>
	);
};
