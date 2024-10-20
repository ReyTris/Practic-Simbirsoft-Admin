import { EntitiesService } from '@/services/entities.service';
import { Button, Pagination, PaginationProps, Select } from 'antd';
import { useEffect, useState } from 'react';
import OrderItem from './components/OrderItem';
import { IEntitiesService } from '@/models/entities/IEntitiesService';
export const OrdersPage = () => {
	const [data, setData] = useState<IEntitiesService>({ data: [], count: 0 });
	const [page, setPage] = useState(1);

	const [limit, setLimit] = useState(10);
	const [isLoading, setIsLoading] = useState(false);

	const [cityFilter, setCityFilter] = useState('');
	const [colorFilter, setColorFilter] = useState('');
	const [brandFilter, setBrandFilter] = useState('');
	const [filteredData, setFilteredData] = useState(data.data);

	const uniqueCities = Array.from(
		new Set(data.data.map((item) => item.cityId.name))
	);

	const uniqueColors = Array.from(new Set(data.data.map((item) => item.color)));

	const uniqueBrands = Array.from(
		new Set(data.data.map((item) => item.carId.name))
	);

	const handleCityChange = (value: string) => {
		setCityFilter(value);
	};

	const handleColorChange = (value: string) => {
		setColorFilter(value);
	};

	const handleBrandChange = (value: string) => {
		setBrandFilter(value);
	};

	const handleApplyFilters = () => {
		const filteredData = data.data.filter((item) => {
			return (
				(cityFilter === '' || item.cityId.name === cityFilter) &&
				(colorFilter === '' || item.color === colorFilter) &&
				(brandFilter === '' || item.carId.name === brandFilter)
			);
		});
		setFilteredData(filteredData);
	};

	const handleCloseFilters = () => {
		setCityFilter('');
		setColorFilter('');
		setBrandFilter('');
		setFilteredData(data.data);
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
	const fetchData = async (page = 1, limit = 10) => {
		setIsLoading(true);
		try {
			const response = await EntitiesService.getAllOrders(page, limit);
			setData(response);
			setFilteredData(response.data);
		} catch (error) {
			setData({ data: [], count: 0 });
		} finally {
			setIsLoading(false);
		}
	};

	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
		current,
		pageSize
	) => {
		setPage(current);
		setLimit(pageSize);
		fetchData(current, pageSize);
	};

	useEffect(() => {
		fetchData(page, limit);
	}, [page]);
	return (
		<div className="">
			<h2 className="text-[29px] font-normal text-[#3D5170]">Заказы</h2>
			<div className="mt-8 rounded-lg shadow-2xl">
				<div className="py-4 px-5 flex justify-between">
					<div className="">
						<Select
							value={cityFilter}
							onChange={handleCityChange}
							placeholder="Город"
							style={{ width: 120 }}
							className="ml-4"
						>
							<Select.Option value="">Все города</Select.Option>
							{uniqueCities.map((city) => (
								<Select.Option key={city} value={city}>
									{city}
								</Select.Option>
							))}
						</Select>
						<Select
							value={colorFilter}
							onChange={handleColorChange}
							placeholder="Цвет"
							style={{ width: 120 }}
							className="ml-4"
						>
							<Select.Option value="">Все цвета</Select.Option>
							{uniqueColors.map((color) => (
								<Select.Option key={color} value={color}>
									{color}
								</Select.Option>
							))}
						</Select>
						<Select
							value={brandFilter}
							onChange={handleBrandChange}
							placeholder="Марка"
							style={{ width: 120 }}
							className="ml-4"
						>
							<Select.Option value="">Все марки</Select.Option>
							{uniqueBrands.map((brand) => (
								<Select.Option key={brand} value={brand}>
									{brand}
								</Select.Option>
							))}
						</Select>
					</div>
					<div className="ml-auto">
						<Button
							type="default"
							className="bg-red-600 text-white mr-4"
							onClick={handleCloseFilters}
						>
							Отменить
						</Button>
						<Button type="primary" onClick={handleApplyFilters}>
							Применить
						</Button>
					</div>
				</div>
				<div className="">
					{isLoading
						? 'Загрузка...'
						: filteredData.map((item) => <OrderItem item={item} />)}
					<Pagination
						defaultCurrent={1}
						total={data.count}
						onChange={(page) => {
							setPage(page);
							handleCloseFilters();
						}}
						className="py-[21px] border-t-[1px] border-[#E5E5E5] text-center"
						itemRender={itemRender}
						onShowSizeChange={onShowSizeChange}
					/>
				</div>
			</div>
		</div>
	);
};
