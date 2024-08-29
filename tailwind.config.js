/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			width: {
				sidebar: '64px',
				wrapper: 'calc(100% - 64px)',
			},
			colors: {
				main: '#0ec261',
				grayLight: '#EEEEEE',
				gray: '#999999',
			},
		},
	},
	plugins: [],
};
