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

export interface City {
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

export interface Car {
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

export interface IOrderStatus {
	count: number;
	data: {
		id: number;
		name: string;
		createdAt: string;
		updatedAt: string;
	}[];
}

export interface ICities extends IOrderStatus {}

export interface ICarId {
	count: number;
	data: ICarIdData[];
}

export interface ICarIdData {
	id: number;
	name: string;
	description: string;
	number: string;
	priceMin: number;
	priceMax: number;
	tank: string;
	thumbnail: {
		path: string;
	};
	createdAt: string;
	updatedAt: string;
	categoryId: {
		id: number;
		name: string;
		description: string;
		createdAt: string;
		updatedAt: string;
	};
	colors: string;
}
