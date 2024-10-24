export enum PathNames {
	MAIN_PAGE = '/',
	AUTH_PAGE = 'auth',
	LOGIN_PAGE = 'login',
	REGISTER_PAGE = 'register',
	ORDERS_PAGE = 'orders',
	CAR_INFO_PAGE = 'car-info',
}

export type PathNamesValues = (typeof PathNames)[keyof typeof PathNames];
