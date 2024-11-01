import { PathNames } from '@/router/pathNames';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
	filters: IStateFilter;
	message: {
		status: boolean;
		message: string;
		color: string;
	};
}

export interface IStateFilter {
	carId: number | null;
	cityId: number | null;
	orderStatusId: number | null;
}
const initialState: IInitialState = {
	filters: {
		carId: null,
		cityId: null,
		orderStatusId: null,
	},
	message: {
		status: false,
		message: '',
		color: '',
	},
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<IStateFilter>) => {
			state.filters = action.payload;
		},

		setMessage: (
			state,
			action: PayloadAction<{ status: boolean; message: string; color: string }>
		) => {
			state.message = action.payload;
		},
	},
});

export const { setFilters, setMessage } = orderSlice.actions;

export default orderSlice.reducer;
