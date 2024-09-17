import { configureStore } from '@reduxjs/toolkit';

import orderReducer from './OrderSlice';
import userSlice from './userSlice';

export const store = configureStore({
	reducer: {
		order: orderReducer,
		user: userSlice
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
