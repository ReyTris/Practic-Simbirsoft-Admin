import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import {
	ICarId,
	ICities,
	IOrderStatus,
} from '@/models/entities/IEntitiesService';
import { setFilters } from '@/store/OrderSlice';
import { Button, ConfigProvider, Select } from 'antd';

interface IFilterProps {
	cities: ICities;
	cars: ICarId;
	orderStatus: IOrderStatus;
	handleClearFilters: () => void;
	handleApplyFilters: () => void;
}

const Filter = ({
	cities,
	cars,
	orderStatus,
	handleClearFilters,
	handleApplyFilters,
}: IFilterProps) => {
	const dispatch = useAppDispatch();

	const { filters } = useAppSelector((state) => state.order);

	const buttonActive = () =>
		!filters.cityId && !filters.carId && !filters.orderStatusId;

	return (
		<div className="py-4 px-5 flex justify-between sticky top-0 bg-[#F5F6F8] w-full">
			<div>
				<Select
					value={filters.cityId}
					onChange={(value) => {
						dispatch(setFilters({ ...filters, cityId: value }));
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
					value={filters.orderStatusId}
					onChange={(value) => {
						dispatch(setFilters({ ...filters, orderStatusId: value }));
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
					value={filters.carId}
					onChange={(value) => {
						dispatch(setFilters({ ...filters, carId: value }));
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
						disabled={buttonActive()}
					>
						Отменить
					</Button>
				</ConfigProvider>

				<Button
					type="primary"
					onClick={handleApplyFilters}
					disabled={buttonActive()}
				>
					Применить
				</Button>
			</div>
		</div>
	);
};

export default Filter;
