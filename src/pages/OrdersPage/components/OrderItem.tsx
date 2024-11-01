import { IDataCar } from '@/models/entities/IEntitiesService';
import dayjs from 'dayjs';
import Checked from '@/assets/icons/checked.svg';
import CheckBox from '@/assets/icons/checkbox.svg';
import Apply from '@/assets/icons/apply.svg';
import Close from '@/assets/icons/close.svg';
import More from '@/assets/icons/more.svg';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PathNames } from '@/router/pathNames';

import AbstractCar from '@/assets/images/abstractCar.png';

interface IOrderItemProps {
	item: IDataCar;
}

const OrderItem = ({ item }: IOrderItemProps) => {
	const {
		id,
		color,
		carId,
		cityId,
		pointId,
		dateFrom,
		dateTo,
		price,
		isFullTank,
		isNeedChildChair,
		isRightWheel,
	} = item;

	const navigate = useNavigate();

	const handlerClickChange = (id: number) => {
		navigate(`/${PathNames.CAR_INFO_PAGE}/${carId.id}`);
	};

	return (
		<div className="flex justify-between items-center gap-8 flex-wrap py-4 px-5 max-lg:p-2 border-t-[1px] border-[#E5E5E5]">
			<div className="w-[140px] h-[60px]">
				<img
					className="w-full h-full object-cover"
					width="140"
					height="60"
					src={
						!carId.thumbnail.path.includes('blob')
							? carId.thumbnail.path
							: AbstractCar
					}
					alt=""
				/>
			</div>
			<div className="max-w-[280px] text-[#889098] ml-4">
				<div>
					<span className="text-black">{carId.name}</span> в
					<span className="text-black"> {cityId.name}</span>, {pointId.address}
				</div>
				<div>
					{`${dayjs(Number(dateFrom)).format('DD.MM.YYYY HH:mm')} - ${dayjs(
						Number(dateTo)
					).format('DD.MM.YYYY HH:mm')}`}
				</div>

				<div>
					Цвет: <span className="text-black">{color}</span>
				</div>
			</div>

			<div className="">
				<div className="">
					<div className="flex items-center">
						{isFullTank ? <Checked /> : <CheckBox />}{' '}
						<span
							className={cn(isFullTank ? 'text-black' : 'text-gray', 'ml-2')}
						>
							Полный бак
						</span>
					</div>
					<div className="flex items-center">
						{isNeedChildChair ? <Checked /> : <CheckBox />}{' '}
						<span
							className={cn(
								isNeedChildChair ? 'text-black' : 'text-gray',
								'ml-2'
							)}
						>
							Детское кресло
						</span>
					</div>
					<div className="flex items-center">
						{isRightWheel ? <Checked /> : <CheckBox />}{' '}
						<span
							className={cn(isRightWheel ? 'text-black' : 'text-gray', 'ml-2')}
						>
							Правый руль
						</span>
					</div>
				</div>
			</div>

			<div className="text-[24px]">{price} &#8381;</div>

			<div className="flex border-gray border-[1px] rounded">
				<button className="p-2 flex items-center text-[#5A6169] text-[11px]">
					<Apply /> <span className="ml-1">Готово</span>
				</button>
				<button className="p-2 flex items-center text-[#5A6169] text-[11px] border-gray border-l">
					<Close /> <span className="ml-1">Отмена</span>
				</button>
				<button className="p-2 flex items-center text-[#5A6169] text-[11px] border-gray border-l">
					<More /> <span className="ml-1">Изменить</span>
				</button>
			</div>
		</div>
	);
};

export default OrderItem;
