import axios from 'axios';

export const API_URL = 'http://frontend-study.simbirsoft.dev/api/';

export const $api = axios.create({
	// withCredentials: true,
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
	},
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(
		'accessToken'
	)}`;
	return config;
});

$api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get(`${API_URL}/auth/refresh`, {
					withCredentials: true,
				});

				localStorage.setItem('accessToken', response.data.accessToken);
				return $api.request(originalRequest);
			} catch (error) {
				console.log('НЕ АВТОРИЗОВАН');
			}
		}

		throw error;
	}
);
