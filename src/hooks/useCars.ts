import { useEffect, useState } from 'react';
import { CarService } from '@/services/car.service';
import { ICar, ICarApiResponse } from '@/services/car.service';
import { radioData } from '@/constants/radioData';

interface IUseCars {
	cars: ICar[];
	loading: boolean;
}

export const useCars = (radioValue: string): IUseCars => {
	const [cars, setCars] = useState<ICar[]>([]);
	const [loading, setLoading] = useState(true);

	const isFilterCars = (data: ICar[], type: string): ICar[] => {
		return data.filter((item) => item.categoryId.name === type);
	};

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response: ICarApiResponse = await CarService.getAllCars();
				if (radioValue === radioData[0].value) {
					setCars(response.data);
				} else {
					setCars(isFilterCars(response.data, radioValue));
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchCars();
	}, [radioValue]);

	return { cars, loading };
};
