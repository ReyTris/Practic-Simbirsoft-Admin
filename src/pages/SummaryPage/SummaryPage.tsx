import { useAppSelector } from '@/hooks/useDispatch';
import { RootState } from '@/store/store';
import dayjs from 'dayjs';

export const SummaryPage = () => {
	const { model, additional } = useAppSelector(
		(state: RootState) => state.order.data
	);
	const { value, number, imagePath } = model.fields.model;
	const { tank } = additional.fields;
	const { startDate, endDate } = additional;
	return (
		<div className="flex justify-between max-xl:flex-col">
			<div className="">
				<div className="text-[18px] font-normal">{value}</div>
				<div className="text-[14px] leading-[14px] w-fit mt-2 p-2 border rounded">
					{number}
				</div>

				{tank && (
					<div className="mt-2">
						<span className="text-[14px] font-semibold">Топливо</span> 100%
					</div>
				)}

				<div className="mt-2">
					<span className="text-[14px] font-semibold">{startDate.name} </span>
					<span>{dayjs(startDate.value).format('DD.MM.YYYY HH:mm')}</span>
				</div>
				<div className="mt-2">
					<span className="text-[14px] font-semibold">{endDate.name} </span>
					<span>{dayjs(endDate.value).format('DD.MM.YYYY HH:mm')}</span>
				</div>
			</div>
			<img src={imagePath} alt={value} className="w-[256px]" />
		</div>
	);
};
