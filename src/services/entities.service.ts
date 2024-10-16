import { $api } from '@/api/api';
import { IEntitiesService } from '@/models/entities/IEntitiesService';
import { AxiosResponse } from 'axios';

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
