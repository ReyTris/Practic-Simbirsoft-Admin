import { PathNames } from '@/router/pathNames';
import { ICar } from '@/services/car.service';

export interface IOrderField {
	name: string;
	value: string;
}

export interface IAddressField extends IOrderField {
	city: string;
	street: string;
}

export interface IModelField extends IOrderField {
	type: string;
	id: number | null;
	price: string;
	colors: string[];
	number: string;
	imagePath: string;
}

export interface IAdditionalField extends IOrderField {
	type: string;
}

export interface IButtonOrder {
	status: boolean;
	label: string;
	link: string;
}

export interface IPosition {
	fields: {
		address: IAddressField;
	};
	button: IButtonOrder;
}

export interface IModel {
	fields: {
		model: IModelField;
	};
	button: IButtonOrder;
}

export interface IAdditional {
	fields: {
		color: IOrderField;
		timeLength: IOrderField;
		tariff: IOrderField;
		tank: IAdditionalField;
		chair: IAdditionalField;
		wheel: IAdditionalField;
	};
	
	startDate: IOrderField;
	endDate: IOrderField;
	button: IButtonOrder;
}

export interface IOrderData {
	[PathNames.POSITION_PAGE]?: IPosition;
	[PathNames.MODEL_PAGE]?: IModel;
	[PathNames.ADDITIONAL_PAGE]?: IAdditional;
	[PathNames.SUMMARY_PAGE]?: IModel;
}

export type Fields = 'address' | 'model';

export type ICombinedFields = {
	[key in Fields]?: IOrderField | IAddressField | IModelField;
};

export interface IInitialState {
	data: IOrderData;
	currentCoordinate: [number, number];
	combinedFields: ICombinedFields;
	currentZoom: number;
	priceDays: number;
	priceOptions: number;
	finalPrice: number;
}

//actions
export interface IActionUpdatePosition {
	city?: string;
	street?: string;
	status?: boolean;
	coordinate?: [number, number];
	zoom?: number;
}

export interface IActionUpdateModel {
	model?: string;
	type?: string;
	status?: boolean;
	id?: number | null;
	price?: string;
	colors?: string[];
	imagePath?: string;
	number?: string;
}
export interface IActionUpdateAdditional {
	options?: {
		[key in AdditionalPayload]?: string;
	};
	status?: boolean;
	startDate?: string;
	endDate?: string;
}

export type AdditionalPayload =
	| 'color'
	| 'timeLength'
	| 'tariff'
	| 'tank'
	| 'chair'
	| 'wheel'
	| 'status';
