import { getLastPathPart } from '@/features/getLastPathPart';
import { useAppSelector } from '@/hooks/useDispatch';
import { PathNames } from '@/router/pathNames';
import { RootState } from '@/store/store';
import { Fields, IOrderData } from '@/store/types';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

interface OrderBarProps {
	className?: string;
}

export const OrderBar = ({ className }: OrderBarProps) => {
	const location = useLocation();
	let lastPartPath = getLastPathPart(location.pathname);
	if (lastPartPath == PathNames.ORDER_PAGE)
		lastPartPath = PathNames.POSITION_PAGE;

	const orderData = useAppSelector((state: RootState) => state.order.data);

	const priceCar = orderData.model.fields.model.price;
	const finalPrice = useAppSelector(
		(state: RootState) => state.order.finalPrice
	);

	const getOrderFields = useAppSelector(
		(state: RootState) => state.order.combinedFields
	);

	return (
		<ul className={className}>
			{Object.keys(getOrderFields).map((fieldKey: Fields) => {
				const field = getOrderFields[fieldKey];
				if (!field.value) return null;
				return (
					<li key={fieldKey}>
						<div key={fieldKey} className="flex justify-between items-end">
							<span className="inline-block text-[14px]">
								{' '}
								{field.name + ': '}
							</span>
							<div className="border-b-[1px] border-dotted border-gray flex-1 mx-2 mb-[6px]"></div>
							<span className="inline-block max-w-[112px] text-[14px] text-gray text-right">
								{field.value}
							</span>
						</div>
					</li>
				);
			})}
			{finalPrice !== 0 ? (
				<div className="mt-8 text-[16px]">
					<span className="font-semibold">Цена</span>: {finalPrice} Р
				</div>
			) : (
				<div className="mt-8 text-[16px]">
					<span className="font-semibold">Цена</span>: от {priceCar}
				</div>
			)}
			<Button
				to={orderData[lastPartPath as keyof IOrderData].button.link}
				variant="green-to-darkgreen"
				className={cn('mt-8 w-[100%] text-center', {
					'pointer-events-none opacity-50 bg-none bg-gray':
						!orderData[lastPartPath as keyof IOrderData].button.status,
				})}
			>
				{orderData[lastPartPath as keyof IOrderData].button.label}
			</Button>
		</ul>
	);
};
