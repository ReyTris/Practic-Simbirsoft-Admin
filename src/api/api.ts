import axios from 'axios';

const API_URL = 'http://frontend-study.simbirsoft.dev/api/';

export const $api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
	},
});
