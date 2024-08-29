import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { useRateCar } from '@/hooks/useRateCar';
import { updateAdditional, updateFinalPrice } from '@/store/OrderSlice';
import { RootState } from '@/store/store';
import { Checkbox, DatePicker, Radio, RadioChangeEvent, Space } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { useEffect, useState } from 'react';

import * as pickerstyles from './dataPicker.module.scss';

import ClearInput from '@/assets/icons/clearInput.svg';
import dayjs from 'dayjs';

const plainOptions = [
	{ label: 'Полный бак, 500р', value: 500, field: 'tank' },
	{ label: 'Детское кресло, 200р', value: 200, field: 'chair' },
	{ label: 'Правый руль, 1600р', value: 1600, field: 'wheel' },
];

export const AdditionalPage = () => {
	const { colors: carColors, id } = useAppSelector(
		(state: RootState) => state.order.data.model.fields.model
	);

	const {
		startDate: startDateStore,
		endDate: endDateStore,
		fields,
	} = useAppSelector((state: RootState) => state.order.data.additional);

	const { color, tank, chair, wheel } = fields;

	const { priceDays: priceDaysStore, priceOptions: priceOptionsStore } =
		useAppSelector((state: RootState) => state.order);

	const dispatch = useAppDispatch();
	const { rate, loading } = useRateCar(id);

	const [state, setState] = useState({
		selectedColor: color.value || '',
		startDate: startDateStore.value || null,
		endDate: endDateStore.value || null,
		tariff: fields.tariff.value || null,
		priceDays: priceDaysStore || 0,
		priceOptions: priceOptionsStore || 0,
		options: {
			values:
				[tank, chair, wheel]
					.filter((item) => item.value.length > 0)
					.map(
						(item) =>
							plainOptions.find((option) => option.field === item.type)?.value
					) || [],
			fields: [tank, chair, wheel]
				.filter((item) => item.value.length > 0)
				.map((item) => item.type),
		},

		rate: '',
		time: '',
	});

	const onChangeColor = (e: RadioChangeEvent) => {
		setState((prev) => ({ ...prev, selectedColor: e.target.value }));
	};

	const onChangeTariff = (e: RadioChangeEvent) => {
		setState((prev) => ({ ...prev, tariff: e.target.value }));
	};

	const onChangeAdditional: Checkbox.GroupProps['onChange'] = (
		checkedValues
	) => {
		const totalAdditionalCost = checkedValues.reduce(
			(sum: number, value: number) => {
				return typeof value === 'number' ? sum + value : sum;
			},
			0
		);

		const selectedOptions = checkedValues.map((value) => {
			return plainOptions.find((option) => option.value === value)?.field;
		});

		setState((prev) => ({
			...prev,
			options: { values: checkedValues, fields: selectedOptions },
			priceOptions: totalAdditionalCost,
		}));
	};

	const handleStartDateChange = (date: any) => {
		setState((prev) => ({
			...prev,
			startDate: date,
			endDate: null,
		}));
		dispatch(updateAdditional({ startDate: date }));
	};

	const handleEndDateChange = (date: any) => {
		setState((prev) => ({
			...prev,
			endDate: date,
		}));
		dispatch(updateAdditional({ endDate: date }));
	};

	const disabledStartDate: RangePickerProps['disabledDate'] = (current) => {
		return dayjs(current).isBefore(dayjs().subtract(1, 'day'));
	};
	const disabledDate: RangePickerProps['disabledDate'] = (current) => {
		return state.startDate
			? current && current < state.startDate.startOf('day')
			: false;
	};

	const calculateDaysDiff = (timeType: string) => {
		const { startDate, endDate } = state;
		if (startDate && endDate) {
			return endDate.diff(startDate, timeType);
		}
		return 0;
	};

	const calculatePriceOfDays = (value: string, timeType: string) => {
		setState((prev) => ({
			...prev,
			rate: value,
			time: timeType,
		}));
	};

	useEffect(() => {
		const daysDiff = calculateDaysDiff(state.time);
		setState((prev) => ({
			...prev,
			priceDays: Number(state.rate) * daysDiff,
		}));
	}, [state.rate, state.time, state.startDate, state.endDate]);

	useEffect(() => {
		dispatch(updateAdditional({ options: { color: state.selectedColor } }));
	}, [state.selectedColor]);

	useEffect(() => {
		if (state.startDate && state.endDate) {
			const commonMinutes = calculateDaysDiff('minutes');
			const days = Math.ceil(commonMinutes / (60 * 24));
			const hours = Math.ceil((commonMinutes % (60 * 24)) / 60);
			const totalDays = days - (hours > 0 ? 1 : 0);
			dispatch(
				updateAdditional({ options: { timeLength: `${totalDays}д ${hours}ч` } })
			);
		}
	}, [state.endDate]);

	useEffect(() => {
		dispatch(
			updateFinalPrice({
				priceDays: state.priceDays,
				priceOptions: state.priceOptions,
			})
		);
	}, [state.startDate, state.endDate, state.priceDays, state.priceOptions]);

	useEffect(() => {
		dispatch(updateAdditional({ options: { tariff: state.tariff } }));
	}, [state.tariff]);

	useEffect(() => {
		plainOptions.forEach((option) => {
			if (state.options.fields.includes(option.field)) {
				dispatch(updateAdditional({ options: { [option.field]: 'Да' } }));
			} else {
				dispatch(updateAdditional({ options: { [option.field]: '' } }));
			}
		});
		if (state.tariff && state.selectedColor && state.endDate) {
			dispatch(updateAdditional({ status: true }));
		}
	}, [state.options, state.tariff, state.selectedColor, state.endDate]);

	return (
		<div>
			<div>
				<p>Цвет</p>
				<Radio.Group
					className="radio-custom mt-[18px]"
					onChange={onChangeColor}
					value={state.selectedColor}
				>
					{carColors.map((color) => (
						<Radio key={color} value={color}>
							{color}
						</Radio>
					))}
				</Radio.Group>
			</div>
			<div className="mt-[32px]">
				<p>Дата аренды</p>
				<Space className="mt-[18px]" direction="vertical" size="middle">
					<Space style={{ alignItems: 'center' }}>
						<span className="inline-block w-3">С</span>
						<div className="pb-[2px] px-1 border-b border-black w-fit">
							<DatePicker
								value={state.startDate}
								onChange={handleStartDateChange}
								format="YYYY-MM-DD HH:mm"
								className="border-none outline-none"
								suffixIcon={false}
								allowClear={{ clearIcon: <ClearInput /> }}
								disabledDate={disabledStartDate}
							/>
						</div>
					</Space>
					<Space style={{ alignItems: 'center' }}>
						<span className="inline-block w-3">По</span>
						<div className="pb-[2px] px-1 border-b border-black w-fit">
							<DatePicker
								value={state.endDate}
								onChange={handleEndDateChange}
								disabledDate={disabledDate}
								format="YYYY-MM-DD HH:mm"
								className="border-none outline-none"
								suffixIcon={false}
								allowClear={{ clearIcon: <ClearInput /> }}
							/>
						</div>
					</Space>
				</Space>
			</div>

			<div className="mt-[32px]">
				<p>Тариф</p>
				{loading ? (
					<div>Загрузка...</div>
				) : (
					<Radio.Group
						className="mt-[18px] radio-custom flex flex-col"
						onChange={onChangeTariff}
						value={state.tariff}
						disabled={!state.endDate}
					>
						<Radio
							value="Поминутно"
							onClick={() => calculatePriceOfDays('7', 'minutes')}
						>
							Поминутно, 7₽/мин
						</Radio>
						<Radio
							value="На сутки"
							onClick={() => calculatePriceOfDays(rate, 'days')}
						>{`На сутки, ${rate} ₽/сутки`}</Radio>
					</Radio.Group>
				)}
			</div>

			<div className="mt-[32px]">
				<p>Доп услуги</p>
				<Checkbox.Group
					className="custom-checkbox mt-[18px] flex flex-col"
					options={plainOptions}
					onChange={onChangeAdditional}
					disabled={!state.endDate}
					value={state.options.values}
					data-custom-checkbox
				/>
			</div>
		</div>
	);
};
