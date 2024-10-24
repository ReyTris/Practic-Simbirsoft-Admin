import { API_URL } from '@/api/api';
import { PathNames } from '@/router/pathNames';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const Footer = () => {
	const navigate = useNavigate();
	return (
		<div className="flex justify-between gap-3 max-sm:flex-col mt-auto p-[27px] bg-white ">
			<div className="text-[#007BFF] hover:text-[rgb(58 152 252)]">
				<NavLink to={PathNames.MAIN_PAGE}>Главная страница</NavLink>
			</div>
			<span className="text-[#818EA3] text-[14px]">
				Copyright © 2020 Simbirsoft
			</span>
		</div>
	);
};
