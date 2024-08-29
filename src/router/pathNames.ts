export enum PathNames {
	MAIN_PAGE = '/',
	INSURANCE_PAGE = 'insurance',
	GASOLINE_PAGE = 'gasoline',
	PARKING_PAGE = 'parking',
	SERVICE_PAGE = 'service',
	ORDER_PAGE = 'order',
	POSITION_PAGE = 'position',
	MODEL_PAGE = 'model',
	ADDITIONAL_PAGE = 'additional',
	SUMMARY_PAGE = 'summary',
}

export type PathNamesValues = typeof PathNames[keyof typeof PathNames];