import { $api } from '@/api/api';
import {
	ICarId,
	ICarIdData,
	ICities,
	IDataCar,
	IEntitiesService,
	IOrderStatus,
} from '@/models/entities/IEntitiesService';
import { AxiosResponse } from 'axios';

export const EntitiesService = {
	async getAllOrders(
		page: number,
		limit: number,
		cityId?: number,
		carId?: number,
		orderStatusId?: number
	): Promise<IEntitiesService> {
		const response: AxiosResponse<any> = await $api.get(
			`/db/order?page=${page}&limit=${limit}${
				cityId ? `&cityId=${cityId}` : ''
			}${carId ? `&carId=${carId}` : ''}${
				orderStatusId ? `&orderStatusId=${orderStatusId}` : ''
			}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			}
		);
		return response.data;
	},

	async getOrderStatus(): Promise<IOrderStatus> {
		const response: AxiosResponse<any> = await $api.get(`/db/orderStatus`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		return response.data;
	},

	async getCarId(): Promise<ICarId> {
		const response: AxiosResponse<any> = await $api.get(`/db/car`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		return response.data;
	},

	async getCityId(): Promise<ICities> {
		const response: AxiosResponse<any> = await $api.get(`/db/city`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		return response.data;
	},

	async getCarOnId(id: number): Promise<ICarIdData> {
		const response: AxiosResponse<any> = await $api.get(`/db/car/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		return response.data.data;
	},
};
