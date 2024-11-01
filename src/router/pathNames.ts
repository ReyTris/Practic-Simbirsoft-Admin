export enum PathNames {
	MAIN_PAGE = '/',
	AUTH_PAGE = 'auth',
	LOGIN_PAGE = 'login',
	REGISTER_PAGE = 'register',
	ORDERS_PAGE = 'orders',
	CAR_INFO_PAGE = 'car-info',
	LIST_CARS_PAGE = 'list-cars',
}

export type PathNamesValues = (typeof PathNames)[keyof typeof PathNames];
