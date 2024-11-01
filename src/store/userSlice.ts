import { $api } from '@/api/api';
import { AuthService } from '@/services/auth.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ILogin {
	login: string;
	password: string;
}

export const loginUser = createAsyncThunk(
	'user/login',
	async ({ login, password }: ILogin, { rejectWithValue }) => {
		try {
			const response = await AuthService.login(login, password);

			localStorage.setItem('accessToken', response.data.access_token);
			localStorage.setItem('refreshToken', response.data.refresh_token);
			return response;
		} catch (error) {
			return rejectWithValue('Ошибка авторизации' || error);
		}
	}
);

export const refreshToken = createAsyncThunk(
	'user/refresh',
	async (_, { rejectWithValue }) => {
		try {
			const response = await AuthService.refreshToken();

			localStorage.setItem('accessToken', response.data.access_token);
			localStorage.setItem('refreshToken', response.data.refresh_token);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const initialState = {
	isAuth: localStorage.getItem('accessToken') ? true : false,
	error: '',
	isLoading: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state, action) => {
			state.error = '';
			state.isLoading = true;
		}),
			builder.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.isLoading = false;
				state.error = '';
			});

		builder.addCase(loginUser.rejected, (state, action) => {
			state.isAuth = false;
			state.isLoading = false;
			state.error = action.payload;
		});

		builder.addCase(refreshToken.pending, (state, action) => {
			state.error = '';
			state.isLoading = true;
		}),
			builder.addCase(refreshToken.fulfilled, (state, action) => {
				state.isAuth = true;
				state.isLoading = false;
				state.error = '';
			});

		builder.addCase(refreshToken.rejected, (state, action) => {
			state.isAuth = false;
			state.isLoading = false;
			state.error = action.payload;
		});
	},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
