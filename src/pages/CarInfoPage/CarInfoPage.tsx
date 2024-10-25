import { ICarIdData } from '@/models/entities/IEntitiesService';
import { PathNames } from '@/router/pathNames';
import { EntitiesService } from '@/services/entities.service';
import { Button, Checkbox, ConfigProvider, Progress } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams } from 'react-router-dom';

interface ICarInfo {
	name: string;
	categoryId: {
		name: string;
	};
	description: string;
	colors: string[];
	thumbnail: {
		path: string;
	};
}

export const CarInfoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	var _ = require('lodash');

	const [message, setMessage] = useState('');
	const [reqStatus, setReqStatus] = useState(false);
	console.log(message);

	const [data, setData] = useState<ICarIdData>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [checkedColors, setCheckedColors] = useState([]);

	const colorRef = useRef<string>(null);

	const [carInfo, setCarInfo] = useState<ICarInfo>({
		name: '',
		categoryId: {
			name: '',
		},
		description: '',
		colors: [''],
		thumbnail: {
			path: '',
		},
	});

	console.log(carInfo);
	console.log(data);

	const handleColorChange = (value: string) => {
		colorRef.current = value;
	};

	const handleNameChange = (value: string) => {
		setCarInfo((prev) => ({ ...prev, name: value }));
	};

	const handleTypeChange = (value: string) => {
		setCarInfo((prev) => ({ ...prev, categoryId: { name: value } }));
	};

	const handleDescriptionChange = (value: string) => {
		setCarInfo((prev) => ({ ...prev, description: value }));
	};

	const handleDeleteCar = async () => {
		try {
			const result = await EntitiesService.deleteCar(Number(id));
			if (result.success) {
				setTimeout(() => {
					navigate(`/${PathNames.CAR_INFO_PAGE}`);
				}, 1500);
			}

			setMessage(result.message);
		} catch (error) {
			if (error.includes('referenced from table')) {
				console.error(error);
			}
		}
	};

	const handleUpdateCar = async () => {
		try {
			const updatedBody = _.merge(data, carInfo);

			const result = await EntitiesService.updateCar(Number(id), updatedBody);
			setMessage(result.message);
		} catch (error) {}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles) => {
			console.log(acceptedFiles[0]);

			setImage(acceptedFiles[0]);
			setCarInfo((prev) => ({
				...prev,
				thumbnail: {
					path: acceptedFiles[0].name,
				},
			}));
		},
	});

	const handleAddColor = () => {
		setCarInfo((prev) => ({
			...prev,
			colors: [...prev.colors, colorRef.current],
		}));

		setCheckedColors((prev) => {
			console.log(prev, colorRef.current);
			return [...prev, colorRef.current];
		});
	};
	useEffect(() => {
		if (id === undefined) {
			setCarInfo({
				name: '',
				categoryId: {
					name: '',
				},
				description: '',
				colors: [''],
				thumbnail: {
					path: '',
				},
			});
			setImage(null);
			setCheckedColors([]);
		} else {
			const fetchData = async () => {
				setIsLoading(true);
				try {
					const response = await EntitiesService.getCarOnId(Number(id));

					setCarInfo((prev) => ({
						...prev,
						colors:
							typeof response.colors === 'string'
								? [response.colors]
								: response.colors,
						name: response.name,
						categoryId: {
							...prev.categoryId,
							name: response.categoryId.name,
						},
						description: response.description,
						thumbnail: {
							path: response.thumbnail.path,
						},
					}));

					setCheckedColors(response.colors);

					if (response === null) {
						navigate('*');
					}

					setCheckedColors((prev) => [...prev, response.colors]);
					setData(response);
				} catch (error) {
					setData(null);
				} finally {
					setIsLoading(false);
				}
			};
			fetchData();
		}
	}, [id]);

	return (
		<div className="">
			<h2 className="text-[29px] font-normal text-[#3D5170]">
				Карточка автомобиля
			</h2>
			<div className="mt-8 flex gap-7 h-[calc(100vh_-_300px)] max-md:flex-col">
				<div className="rounded-lg shadow-2xl w-[330px] max-md:w-full p-6 flex flex-col gap-5 max-md:flex-row bg-white">
					<div className="">
						<div className="py-5">
							<div className="">
								{image ? (
									<div className="w-full">
										<img
											className="w-full object-cover"
											src={URL.createObjectURL(image)}
											alt="Uploaded image"
										/>
									</div>
								) : carInfo.thumbnail.path ? (
									<div className="w-full">
										<img
											className="w-full object-cover"
											src={carInfo.thumbnail.path}
											alt="Uploaded image"
										/>
									</div>
								) : (
									<div className="flex items-center justify-center text-[200px]">
										?
									</div>
								)}

								<div className="text-center text-[24px]">Name car</div>
							</div>

							<div {...getRootProps()} className="dropzone">
								<input {...getInputProps()} />

								<div className="mt-2">
									{isDragActive ? (
										<p>Drop the image here ...</p>
									) : (
										<div className="flex rounded border-[0.5px] border-[#BECAD6]">
											<input
												className="p-2 outline-none"
												type="text"
												placeholder="Выберите файл"
											/>
											<button className="p-2 bg-[#E9ECEF] border-[#BECAD6] border-l-[0.5px] flex-1">
												Обзор
											</button>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="py-4 border-t border-[#BECAD6]">
							<span className="text-[#868E96]">Заполнено</span>
							<Progress percent={50} />
						</div>
					</div>
					<div className="py-4 border-t border-[#BECAD6]">
						<span className="text-[#868E96]">Описание</span>
						<textarea
							className="mt-3 outline-none resize-none"
							name=""
							id=""
							rows={10}
							cols={30}
							onChange={(e) => handleDescriptionChange(e.target.value)}
							value={carInfo.description}
						/>
					</div>
				</div>
				<div className="flex-1 flex flex-col rounded-lg shadow-2xl w-full p-6 bg-white">
					<h3 className="text-[#3D5170] text-[17px] font-medium">
						Настройка автомобиля
					</h3>
					<div className="grid grid-cols-2 gap-5 mt-7">
						<div className="">
							<div className="text-[12px]">Модель автомобиля</div>
							<div className="mt-1 flex rounded border-[0.5px] border-[#BECAD6]">
								<input
									type="text"
									className="p-[10px] outline-none w-full h-[30px]"
									value={carInfo.name}
									onChange={(e) => handleNameChange(e.target.value)}
								/>
							</div>
						</div>
						<div className="">
							<div className="text-[12px]">Тип автомобиля</div>
							<div className="mt-1 flex rounded border-[0.5px] border-[#BECAD6]">
								<input
									type="text"
									className="p-[10px] outline-none  w-full h-[30px]"
									value={carInfo.categoryId.name}
									onChange={(e) => handleTypeChange(e.target.value)}
								/>
							</div>
						</div>
						<div className="">
							<div className="text-[12px]">Доступные цвета</div>
							<div className="flex flex-1 gap-2 items-center justify-center mt-1 ">
								<input
									type="text"
									className="p-[10px] outline-none w-full  rounded border-[0.5px] border-[#BECAD6] h-[30px]"
									onChange={(e) => handleColorChange(e.target.value)}
								/>
								<button
									className="flex items-center justify-center p-[7px] text-[36px] text-[#BECAD6] font-normal w-[30px] h-[30px] rounded border-[0.5px] border-[#BECAD6]"
									onClick={() => handleAddColor()}
								>
									+
								</button>
							</div>
							<div className="flex flex-col">
								{carInfo.colors.map((color, id) => (
									<Checkbox
										className="custom-checkbox mt-2"
										value={color}
										key={id}
										checked={checkedColors.includes(color)}
										onChange={() => {
											if (checkedColors.includes(color)) {
												setCheckedColors(
													checkedColors.filter((c) => c !== color)
												);
											} else {
												setCheckedColors([...checkedColors, color]);
											}
										}}
									>
										{color}
									</Checkbox>
								))}
							</div>
						</div>
					</div>
					<div className="mt-auto flex gap-3">
						<Button type="primary" onClick={handleUpdateCar}>
							Сохранить
						</Button>
						<Button type="default" onClick={() => {}}>
							Отменить
						</Button>

						<ConfigProvider
							theme={{
								components: {
									Button: {
										defaultHoverBg: 'rgb(240 57 57)',
										defaultHoverBorderColor: 'red-400',
										defaultHoverColor: 'white',
									},
								},
							}}
						>
							{id !== undefined && (
								<Button
									type="default"
									className="bg-red-600 text-white ml-auto"
									onClick={() => {
										handleDeleteCar();
									}}
								>
									Удалить
								</Button>
							)}
						</ConfigProvider>
					</div>
				</div>
			</div>
		</div>
	);
};
