import { IDataCar } from '@/services/entities.service';
import dayjs from 'dayjs';
import React from 'react';

interface IOrderItemProps {
	item: IDataCar;
}

const OrderItem = ({ item }: IOrderItemProps) => {
	const { color, carId, cityId, pointId, dateFrom, dateTo } = item;
	return (
		<div className="flex items-center py-4 px-5">
			<div className="w-[140px] h-[60px]">
				<img
					className="w-full h-full object-cover"
					width="140"
					height="60"
					src={carId.thumbnail.path}
					alt=""
				/>
			</div>
			<div className="max-w-[280px] text-[#889098]">
				<div>
					<span className="text-black">{carId.name}</span> в
					<span className="text-black"> {cityId.name}</span>, {pointId.address}
				</div>
				<div>{dayjs(dateFrom).unix()}</div>
				<div></div>
			</div>
		</div>
	);
};

export default OrderItem;
