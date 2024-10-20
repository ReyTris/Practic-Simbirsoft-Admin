import { $api } from '@/api/api';
import { IDataCar, IEntitiesService } from '@/models/entities/IEntitiesService';
import { AxiosResponse } from 'axios';

export const EntitiesService = {
	async getAllOrders(page: number, limit: number): Promise<IEntitiesService> {
		const response: AxiosResponse<any> = await $api.get(
			`/db/order?page=${page}&limit=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			}
		);
		return response.data;
	},

	async getOrderToId(id: string): Promise<IDataCar> {
		const response: AxiosResponse<any> = await $api.get(`/db/order/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		// console.log(response.data);

		return response.data.data;
	},
};
