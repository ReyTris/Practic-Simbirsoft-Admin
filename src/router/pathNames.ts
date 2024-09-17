export enum PathNames {
	MAIN_PAGE = '/',
	AUTH_PAGE = 'auth',
	LOGIN_PAGE = 'login',
	REGISTER_PAGE = 'register',
	ORDERS_PAGE = 'orders',
	ENTITIES_PAGE = 'entities'
}

export type PathNamesValues = (typeof PathNames)[keyof typeof PathNames];
