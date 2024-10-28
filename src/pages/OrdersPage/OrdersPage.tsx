import { EntitiesService } from '@/services/entities.service';
import {
	Button,
	ConfigProvider,
	Pagination,
	PaginationProps,
	Select,
} from 'antd';
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
export const OrdersPage = () => {
	const [page, setPage] = useState(1);

	const [limit, setLimit] = useState(10);
	const [isLoading, setIsLoading] = useState(false);

	const [orderFilters, setOrderFilters] = useState({
		cityId: null,
		carId: null,
		orderStatusId: null,
	});

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

	const handleCityChange = (value: number) => {
		setOrderFilters((prev) => ({ ...prev, cityId: value }));
	};

	const handleStatusChange = (value: number) => {
		setOrderFilters((prev) => ({ ...prev, orderStatusId: value }));
	};

	const handleBrandChange = (value: number) => {
		setOrderFilters((prev) => ({ ...prev, carId: value }));
	};

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
		setOrderFilters({ cityId: null, carId: null, orderStatusId: null });
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
			<div className="h-[calc(100vh_-_300px)] overflow-hidden overflow-y-auto mt-8 max-lg:mt-4 rounded-lg shadow-2xl">
				<div className="py-4 px-5 flex justify-between">
					<div className="">
						<Select
							value={orderFilters.cityId}
							onChange={(value) => {
								handleCityChange(value);
								dispatch(setFilters({ ...orderFilters, cityId: value }));
							}}
							placeholder="Город"
							style={{ width: 120 }}
							className="ml-4"
						>
							{cities.data.map((city) => (
								<Select.Option key={city.id} value={city.id}>
									{city.name}
								</Select.Option>
							))}
						</Select>
						<Select
							value={orderFilters.orderStatusId}
							onChange={(value) => {
								handleStatusChange(value);
								dispatch(setFilters({ ...orderFilters, orderStatusId: value }));
							}}
							placeholder="Статус"
							style={{ width: 120 }}
							className="ml-4"
						>
							{orderStatus.data.map((status) => (
								<Select.Option key={status.id} value={status.id}>
									{status.name}
								</Select.Option>
							))}
						</Select>
						<Select
							value={orderFilters.carId}
							onChange={(value) => {
								handleBrandChange(value);
								dispatch(setFilters({ ...orderFilters, carId: value }));
							}}
							placeholder="Марка"
							style={{ width: 120 }}
							className="ml-4"
						>
							{cars.data.map((car) => (
								<Select.Option key={car.id} value={car.id}>
									{car.name}
								</Select.Option>
							))}
						</Select>
					</div>
					<div className="ml-auto">
						<ConfigProvider
							theme={{
								components: {
									Button: {
										defaultHoverBg: 'rgb(240 57 57)',
										defaultHoverBorderColor: 'red-400',
										defaultHoverColor: 'white',
									},
								},
							}}
						>
							<Button
								type="default"
								className="bg-red-600 text-white mr-4"
								onClick={handleClearFilters}
								disabled={
									!filters.cityId && !filters.carId && !filters.orderStatusId
								}
							>
								Отменить
							</Button>
						</ConfigProvider>

						<Button
							type="primary"
							onClick={handleApplyFilters}
							disabled={
								!filters.cityId && !filters.carId && !filters.orderStatusId
							}
						>
							Применить
						</Button>
					</div>
				</div>
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
						className="py-[21px] border-t-[1px] border-[#E5E5E5] text-center"
						itemRender={itemRender}
						onShowSizeChange={onShowSizeChange}
					/>
				</div>
			</div>
		</>
	);
};
