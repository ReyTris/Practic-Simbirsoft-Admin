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
		const params = {
			page,
			limit,
			cityId,
			carId,
			orderStatusId,
		};
		const response: AxiosResponse<any> = await $api.get(`/db/order`, {
			params,
		});
		return response.data;
	},

	async getOrderStatus(): Promise<IOrderStatus> {
		const response: AxiosResponse<any> = await $api.get(`/db/orderStatus`);

		return response.data;
	},

	async getCarId(): Promise<ICarId> {
		const response: AxiosResponse<any> = await $api.get(`/db/car`);

		return response.data;
	},

	async getCityId(): Promise<ICities> {
		const response: AxiosResponse<any> = await $api.get(`/db/city`);

		return response.data;
	},

	async getCarOnId(id: number): Promise<ICarIdData> {
		const response: AxiosResponse<any> = await $api.get(`/db/car/${id}`);

		return response.data.data;
	},

	async deleteCar(id: number) {
		try {
			const response = await $api.delete(`/db/car/${id}`);

			if (response.status === 200) {
				return { success: true, message: 'Машина успешно удалена' };
			}
		} catch (error) {
			return {
				success: false,
				message: `Нельзя удалить запись, так как существует заказ с данным автомобилем`,
			};
		}
	},

	async updateCar(id: number, data: ICarIdData) {
		try {
			const response = await $api.put(`/db/car/${id}`, data);

			if (response.status === 200) {
				return { success: true, message: 'Машина успешно обновлена' };
			}
		} catch (error) {
			return {
				success: false,
				message: error,
			};
		}
	},
	async createCar(data: ICarIdData) {
		try {
			const response = await $api.post(`/db/car`, data);

			if (response.status === 201) {
				return {
					success: true,
					message: 'Машина успешно Создана',
					id: response.data.data.id,
				};
			} else {
				return {
					success: false,
					message: `Нельзя создать машину`,
				};
			}
		} catch (error) {
			return {
				success: false,
				message: error,
			};
		}
	},
};
