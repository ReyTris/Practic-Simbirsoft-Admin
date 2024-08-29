import ClearInput from '@/assets/icons/clearInput.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import {
	clearAdditional,
	clearModel,
	updatePosition,
} from '@/store/OrderSlice';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { AutoComplete, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';

import mark from '@/assets/icons/mark.png';

import {
	IStreetEntry,
	citiesList,
	streetList,
} from '@/constants/initialMapPoints';
import { PathNames } from '@/router/pathNames';
import { RootState } from '@/store/store';

export const PositionPage = () => {
	const dispatch = useAppDispatch();
	const { data, currentCoordinate, currentZoom } = useAppSelector(
		(state: RootState) => state.order
	);
	const { city: cityData, street: streetData } =
		data[PathNames.POSITION_PAGE].fields.address;

	const [city, setCity] = useState(cityData || '');
	const [street, setStreet] = useState(streetData || '');
	const [coordinate, setCoordinate] = useState(
		currentCoordinate || [54.313836, 48.353282]
	);

	const [zoom, setZoom] = useState(currentZoom || 5);

	const [optionsStreet, setOptionsStreet] = useState<IStreetEntry[]>(
		streetList[cityData] || []
	);

	const coordinateList = Object.values(streetList).flat();

	const prevCityRef = useRef(city);
	const prevStreetRef = useRef(street);

	const onSelectCity = (data: string) => {
		setCity(data);
		setStreet('');
		setZoom(11);
		setCoordinate(streetList[data][0].coordinate);

		setOptionsStreet(streetList[data]);
		dispatch(updatePosition({ street: '' }));
	};

	const onSelectStreet = (data: string) => {
		const selectedStreet = streetList[city].find(
			(street) => street.street === data
		);
		if (selectedStreet) {
			setStreet(selectedStreet.street);
			setCoordinate(selectedStreet.coordinate);
			setZoom(15);
			dispatch(
				updatePosition({
					city,
					street: selectedStreet.street,
					coordinate: selectedStreet.coordinate,
					status: true,
				})
			);
		}
	};

	const onClearStreet = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();

		setStreet('');
		dispatch(updatePosition({ city: '', street: '' }));
	};

	const onClearCity = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();

		setCity('');
		setStreet('');
		setZoom(5);
		dispatch(updatePosition({ city: '', street: '' }));
	};

	useEffect(() => {
		if (prevCityRef.current !== city || prevStreetRef.current !== street) {
			dispatch(clearModel());
			dispatch(clearAdditional());
		}
	}, [city, street, dispatch]);

	useEffect(() => {
		dispatch(updatePosition({}));
	}, [city]);

	useEffect(() => {
		if (city && street) {
			dispatch(
				updatePosition({ city, street, coordinate, zoom, status: true })
			);
		}
	}, [city, street, dispatch]);
	return (
		<div>
			<div className="flex flex-col items-end w-[340px]">
				<div className="relative">
					<label htmlFor="city">Город</label>
					<AutoComplete
						id="city"
						options={citiesList.map((city) => ({ value: city }))}
						style={{ width: 224 }}
						value={city}
						onSelect={onSelectCity}
						onChange={(data) => {
							setCity(data);
						}}
						filterOption={(inputValue, optionsCity) =>
							optionsCity!.value
								.toUpperCase()
								.indexOf(inputValue.toUpperCase()) !== -1
						}
						className="ml-2 border-b-2 border-[#999999]"
					>
						<Input
							placeholder="Начните вводить город ..."
							className="border-none"
							suffix={<ClearInput onMouseDown={onClearCity} />}
						/>
					</AutoComplete>
				</div>
				<div className="relative">
					<label htmlFor="street">Пункт выдачи</label>
					<AutoComplete
						id="street"
						options={optionsStreet.map((city) => ({ value: city.street }))}
						style={{ width: 224 }}
						onSelect={onSelectStreet}
						value={street}
						onChange={(data) => {
							setStreet(data);
						}}
						filterOption={(inputValue, optionsStreet) =>
							optionsStreet!.value
								.toUpperCase()
								.indexOf(inputValue.toUpperCase()) !== -1
						}
						disabled={!city}
						className="ml-2 border-b-2 border-[#999999]"
					>
						<Input
							placeholder="Начните вводить пункт ..."
							className="border-none"
							suffix={<ClearInput onMouseDown={onClearStreet} />}
						/>
					</AutoComplete>
				</div>
			</div>
			<div className="mt-[45px]">
				<div className="mb-[16px]">Выбрать на карте:</div>
				<YMaps query={{ apikey: 'e0d09efb-487f-4235-8ae5-edaa6356c8a1' }}>
					<Map
						defaultState={{ center: coordinate, zoom: zoom }}
						state={{ center: coordinate, zoom: zoom }}
						className="w-[736px] h-[352px] max-lg:w-[100%]"
					>
						{coordinateList.map((coordinateItem) => (
							<Placemark
								key={coordinateItem.street}
								geometry={coordinateItem.coordinate}
								options={{
									iconLayout: 'default#image',
									iconImageHref: mark,
									iconImageSize: [18, 18],
								}}
								onClick={() => {
									setCoordinate(coordinateItem.coordinate);
									setZoom(15);

									for (const [key, value] of Object.entries(streetList)) {
										if (
											value.find(
												(street) => street.street === coordinateItem.street
											)
										) {
											setCity(key);
											setStreet(coordinateItem.street);
											setOptionsStreet(value);
											break;
										}
									}
								}}
							/>
						))}
					</Map>
				</YMaps>
			</div>
		</div>
	);
};
