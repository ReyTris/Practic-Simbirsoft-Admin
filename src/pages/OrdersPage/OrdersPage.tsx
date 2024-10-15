import { EntitiesService, IEntitiesService } from '@/services/entities.service';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import OrderItem from './components/OrderItem';

export const OrdersPage = () => {
	const [data, setData] = useState<IEntitiesService>({ data: [], count: 0 });
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	console.log(data);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await EntitiesService.getAllOrders(page);
				setData(response);
			} catch (error) {
				setData({ data: [], count: 0 });
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [page]);
	return (
		<div className="p-[30px]">
			<h2 className="text-[29px] font-normal text-[#3D5170]">Заказы</h2>
			<div className="mt-8 rounded-lg shadow-2xl">
				<div className="border-b-[1px] border-[#E5E5E5] py-4 px-5"></div>
				<div className="">
					{isLoading
						? 'Загрузка...'
						: data.data.map((item) => <OrderItem item={item} />)}
					<Pagination
						defaultCurrent={1}
						total={data.count}
						onChange={setPage}
						className="border-t-[1px] border-[#E5E5E5] text-center"
					/>
				</div>
			</div>
		</div>
	);
};