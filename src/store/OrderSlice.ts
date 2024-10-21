import { PathNames } from '@/router/pathNames';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
	filters: IStateFilter;
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
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<IStateFilter>) => {
			state.filters = action.payload;
		},
	},
});

export const { setFilters } = orderSlice.actions;

export default orderSlice.reducer;
