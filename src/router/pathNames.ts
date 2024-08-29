export enum PathNames {
	MAIN_PAGE = '/',
	AUTH_PAGE = 'auth',
	LOGIN_PAGE = 'login',
	REGISTER_PAGE = 'register',
}

export type PathNamesValues = (typeof PathNames)[keyof typeof PathNames];
