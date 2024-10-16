export enum PathNames {
	MAIN_PAGE = '/',
	AUTH_PAGE = 'auth',
	LOGIN_PAGE = 'login',
	REGISTER_PAGE = 'register',
	ORDERS_PAGE = 'orders',
	ORDER_DETAIL_PAGE = 'order-detail',
}

export type PathNamesValues = (typeof PathNames)[keyof typeof PathNames];
