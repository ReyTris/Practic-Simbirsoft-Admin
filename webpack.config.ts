import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
	mode: Mode;
	port: 5000;
}

export default (env: EnvVariables) => {
	const isDev = env.mode === 'development';

	const config: webpack.Configuration | DevServerConfiguration = {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src/index.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'build.[contenthash].js',
			publicPath: '/Practic-Simbirsoft-Admin/',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}),
			new webpack.ProgressPlugin(),
			!isDev && new MiniCssExtractPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
						'postcss-loader',
					],
				},
				// {
				// 	test: /\.tsx?$/,
				// 	use: 'ts-loader',
				// 	exclude: /node_modules/,
				// },
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript',
								['@babel/preset-react', { runtime: 'automatic' }],
							],
						},
					},
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack'],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		devtool: 'inline-source-map',
		devServer: {
			port: env.port ?? 3000,
			open: ['/Practic-Simbirsoft-Admin/'],
			historyApiFallback: true,
		},
	};

	return config;
};
