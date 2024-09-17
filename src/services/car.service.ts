import { $api } from '@/api/api';
import { AxiosResponse } from 'axios';

export const CarService = {
	async getAllCars(): Promise<any> {
		const response: AxiosResponse<any> = await $api.get('/db/car/');
		return response.data;
	},
};
