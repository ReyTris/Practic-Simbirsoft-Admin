import { dataOrderMenu } from '@/constants/nav-menu-data';
import { getLastPathPart } from '@/features/getLastPathPart';
import { useAppSelector } from '@/hooks/useDispatch';
import { RootState } from '@/store/store';
import { IOrderData } from '@/store/types';
import { OrderMenuLink } from './OrderMenuLink';

interface OrderNavMenuProps {
	currentPath?: string;
	className?: string;
}

export const OrderNavMenu = ({ currentPath, className }: OrderNavMenuProps) => {
	const currentIndex = dataOrderMenu.findIndex((item) => {
		return getLastPathPart(item.link) === currentPath;
	});

	const filterOrderStatus = useAppSelector((state: RootState) => {
		const statusArr = Object.values(state.order.data).map(
			(item) => item.button.status
		);
		return statusArr;
	});

	return (
		<div className={className}>
			<ul className="flex flex-wrap">
				{dataOrderMenu.map(({ title, link, icon: IconComponent }, index) => {
					const isCurrent = index === currentIndex || index == 0;
					const isNextIfCurrentTrue =
						index === currentIndex + 1 && filterOrderStatus[currentIndex];
					const isButtonTrue = filterOrderStatus[index];

					const isActived = isCurrent || isNextIfCurrentTrue || isButtonTrue;
					return (
						<li key={title} className="flex items-center">
							<OrderMenuLink title={title} link={link} isActived={isActived} />
							{IconComponent && <IconComponent className="mx-3" />}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
