import { $api } from '@/api/api';
import { AxiosResponse } from 'axios';
import { log } from 'console';

export interface IDataCar {
	id: number;
	color: string;
	dateFrom: number;
	dateTo: number;
	price: number;
	isFullTank: boolean;
	isNeedChildChair: boolean;
	isRightWheel: boolean;
	createdAt: string;
	updatedAt: string;
	orderStatusId: null | number;
	cityId: City;
	pointId: Point;
	carId: Car;
	rateId: Rate;
}

interface City {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface Point {
	id: number;
	name: string;
	address: string;
	city_id: number;
	createdAt: string;
	updatedAt: string;
}

interface Car {
	id: number;
	priceMax: number;
	priceMin: number;
	name: string;
	thumbnail: Thumbnail;
	description: string;
	number: string;
	tank: string;
	colors: string;
	category_id: number;
	createdAt: string;
	updatedAt: string;
}

interface Thumbnail {
	path: string;
}

interface Rate {
	id: number;
	price: string;
	rateType_id: number;
	createdAt: string;
	updatedAt: string;
}

export interface IEntitiesService {
	data: IDataCar[];
	count: number;
}

export const EntitiesService = {
	async getAllOrders(page: number): Promise<IEntitiesService> {
		const response: AxiosResponse<any> = await $api.get(
			`/db/order?page=${page}&limit=5`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			}
		);
		console.log(response.data);
		return response.data;
	},
};
