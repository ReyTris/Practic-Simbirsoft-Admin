import { ICarIdData } from '@/models/entities/IEntitiesService';

import AbstractCar from '@/assets/images/abstractCar.png';
import { PathNames } from '@/router/pathNames';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

interface ICarItemProps {
	item: ICarIdData;
}

const CarItem = ({ item }: ICarItemProps) => {
	// const colors = Array.from(new Set(item.colors)).join(', ');
	const navigate = useNavigate();

	const handlerClickChange = () => {
		navigate(`/${PathNames.CAR_INFO_PAGE}/${item.id}`);
	};
	const getThumbnailSrc = (path: string) => {
		if (!String(path).includes('base64')) {
			return AbstractCar;
		}
		return path;
	};

	return (
		<div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8 flex-wrap py-4 px-5 max-lg:p-2 border-t-[1px] border-[#E5E5E5]">
			<div className="w-[140px] h-[60px]">
				<img
					className="w-full h-full object-cover"
					width="140"
					height="60"
					src={getThumbnailSrc(item.thumbnail.path)}
					alt=""
				/>
			</div>
			<div className="text-left">
				Цвета:{' '}
				<span className="text-[#889098] text-[14px]">
					{item.colors.toString().split(',').join(', ')}
				</span>
			</div>
			<div className="flex flex-col">
				<span>Цена от: {item.priceMin}</span>
				<span>Цена до: {item.priceMax}</span>
			</div>
			<Button
				className="max-w-[200px]"
				type="primary"
				onClick={handlerClickChange}
			>
				Изменить
			</Button>
		</div>
	);
};

export default CarItem;
