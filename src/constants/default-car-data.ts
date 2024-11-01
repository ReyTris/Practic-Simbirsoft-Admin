import { ICarIdData } from '@/models/entities/IEntitiesService';

export const defaultCarData: ICarIdData = {
	id: 0,
	priceMax: 0,
	priceMin: 0,
	name: '',
	thumbnail: {
		path: '',
	},
	description: '',
	number: '',
	tank: '',
	colors: [],
	createdAt: '',
	updatedAt: '',
	categoryId: {
		id: 1,
		name: '',
		description: '',
		createdAt: '',
		updatedAt: '',
	},
};
