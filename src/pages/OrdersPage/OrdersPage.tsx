import { EntitiesService } from '@/services/entities.service';
import { Pagination, PaginationProps } from 'antd';
import { useEffect, useState } from 'react';
import OrderItem from './components/OrderItem';
import {
	ICarId,
	ICities,
	IEntitiesService,
	IOrderStatus,
} from '@/models/entities/IEntitiesService';
import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { setFilters, setMessage } from '@/store/OrderSlice';
import Loader from '@/components/ui/Loader';
import Filter from './components/Filter';
export const OrdersPage = () => {
	const [page, setPage] = useState(1);

	const [limit, setLimit] = useState(10);
	const [isLoading, setIsLoading] = useState(false);

	const [filteredData, setFilteredData] = useState<IEntitiesService>({
		data: [],
		count: 0,
	});

	const [orderStatus, setOrderStatus] = useState<IOrderStatus>({
		count: 0,
		data: [],
	});
	const [cars, setCars] = useState<ICarId>({ count: 0, data: [] });
	const [cities, setCities] = useState<ICities>({ data: [], count: 0 });

	const dispatch = useAppDispatch();

	const { filters } = useAppSelector((state) => state.order);

	const handleApplyFilters = async () => {
		fetchData(
			page,
			limit - 1,
			filters.cityId,
			filters.carId,
			filters.orderStatusId
		);
	};

	const handleClearFilters = () => {
		dispatch(setFilters({ cityId: null, carId: null, orderStatusId: null }));
		fetchData(page, limit - 1);
	};

	const itemRender: PaginationProps['itemRender'] = (
		_,
		type,
		originalElement
	) => {
		if (type === 'prev') {
			return <a className="text-[20px]">&laquo;</a>;
		}
		if (type === 'next') {
			return <a className="text-[20px]">&raquo;</a>;
		}
		return originalElement;
	};
	const fetchData = async (
		page = 1,
		limit = 10,
		cityId?: number,
		carId?: number,
		orderStatusId?: number
	) => {
		setIsLoading(true);
		try {
			const response = await EntitiesService.getAllOrders(
				page,
				limit - 1,
				cityId,
				carId,
				orderStatusId
			);
			setFilteredData(response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchEntities = async () => {
		try {
			const [orderStatus, carId, cityId] = await Promise.all([
				EntitiesService.getOrderStatus(),
				EntitiesService.getCarId(),
				EntitiesService.getCityId(),
			]);

			setOrderStatus(orderStatus);
			setCars(carId);
			setCities(cityId);
		} catch (error) {
			console.log(error);
			setOrderStatus({ count: 0, data: [] });
			setCars({ count: 0, data: [] });
			setCities({ data: [], count: 0 });
		}
	};

	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
		current,
		pageSize
	) => {
		setPage(current);
		setLimit(pageSize);
		fetchData(
			current,
			pageSize,
			filters.cityId,
			filters.carId,
			filters.orderStatusId
		);
	};

	useEffect(() => {
		fetchData(
			page,
			limit - 1,
			filters.cityId,
			filters.carId,
			filters.orderStatusId
		);
		fetchEntities();
		dispatch(setMessage({ message: '', status: false, color: '' }));
	}, [page]);
	return (
		<>
			<h2 className="text-[29px] max-lg:text-[20px] font-normal text-[#3D5170]">
				Заказы
			</h2>
			<div className="relative h-[calc(100vh_-_300px)] overflow-hidden overflow-y-auto mt-8 max-lg:mt-4 rounded-lg shadow-2xl">
				<Filter
					cities={cities}
					cars={cars}
					orderStatus={orderStatus}
					handleApplyFilters={handleApplyFilters}
					handleClearFilters={handleClearFilters}
				/>
				<div className="">
					{isLoading ? (
						<div className="flex items-center justify-center py-14">
							<Loader />
						</div>
					) : filteredData.data.length === 0 ? (
						<div className="text-center text-[50px] py-10">
							Ничего не найдено
						</div>
					) : (
						filteredData.data.map((item) => (
							<OrderItem key={item.id} item={item} />
						))
					)}
					<Pagination
						defaultCurrent={1}
						total={filteredData.count}
						onChange={(page) => {
							setPage(page);
						}}
						className="py-[21px] border-t-[1px] border-[#E5E5E5] text-center sticky bottom-0 bg-[#F5F6F8]"
						itemRender={itemRender}
						onShowSizeChange={onShowSizeChange}
					/>
				</div>
			</div>
		</>
	);
};
