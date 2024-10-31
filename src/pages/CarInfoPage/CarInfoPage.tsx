import { defaultCarData } from '@/constants/default-car-data';
import { convertImageToBase64 } from '@/features/convertToBase64';
import { useAppDispatch } from '@/hooks/useDispatch';
import { ICarIdData } from '@/models/entities/IEntitiesService';
import { PathNames } from '@/router/pathNames';
import { EntitiesService } from '@/services/entities.service';
import { setMessage } from '@/store/OrderSlice';
import { Button, Checkbox, ConfigProvider, Progress } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams } from 'react-router-dom';

export const CarInfoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	dispatch(setMessage({ message: '', status: false, color: '' }));

	const [data, setData] = useState<ICarIdData>(null);
	const [image, setImage] = useState(null);
	const [checkedColors, setCheckedColors] = useState([]);

	const colorRef = useRef<string>(null);

	const [carInfo, setCarInfo] = useState<ICarIdData>(defaultCarData);

	const calculateProgress = () => {
		const requiredFields = [
			'name',
			'categoryId.name',
			'description',
			'colors',
			'thumbnail.path',
		];
		const filledFields = requiredFields.filter((field) => {
			if (field.includes('.')) {
				const [parentField, childField] = field.split('.');
				return carInfo[parentField] && carInfo[parentField][childField] !== '';
			} else if (Array.isArray(carInfo[field])) {
				return carInfo[field].length > 0;
			} else {
				return carInfo[field] !== '';
			}
		});

		const progress = (filledFields.length / requiredFields.length) * 100;
		return progress;
	};
	const handleColorChange = (value: string) => {
		colorRef.current = value;
	};

	const handleNameChange = (value: string) => {
		setCarInfo((prev) => ({ ...prev, name: value }));
	};

	const handleTypeChange = (value: string) => {
		setCarInfo((prev) => ({
			...prev,
			categoryId: { ...prev.categoryId, name: value },
		}));
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
					dispatch(setMessage({ message: '', status: false, color: '' }));
				}, 1500);

				dispatch(
					setMessage({
						message: result.message,
						status: true,
						color: '#0EC261',
					})
				);
			} else {
				dispatch(
					setMessage({ message: result.message, status: true, color: 'red' })
				);
			}
		} catch (error) {
			dispatch(setMessage({ message: error, status: true, color: 'red' }));
		}
	};

	const handleAddColor = () => {
		const newColor = colorRef.current;
		if (newColor && !carInfo.colors.includes(newColor)) {
			setCarInfo((prev) => ({
				...prev,
				colors: [...prev.colors, newColor],
			}));
			setCheckedColors((prev) => [...prev, newColor]);
			colorRef.current = '';
		}
	};

	const handleUpdateCar = async () => {
		try {
			const body = {
				...data,
				...carInfo,
				colors: checkedColors,
			};

			let message = '';

			if (id) {
				const response = await EntitiesService.updateCar(Number(id), body);
				message = response.message;
			} else {
				delete body.id;

				const response = await EntitiesService.createCar(body);
				message = response.message;
				if (response.success) {
					setTimeout(() => {
						navigate(`/${PathNames.CAR_INFO_PAGE}/${response.id}`);
						dispatch(setMessage({ message: '', status: false, color: '' }));
					}, 1500);
				}
			}

			dispatch(
				setMessage({
					message: message,
					status: true,
					color: '#0EC261',
				})
			);
		} catch (error) {
			console.error(error);
			dispatch(setMessage({ message: error, status: true, color: 'red' }));
		}
	};

	const handleFileUpload = async (file: File) => {
		try {
			const base64String = await convertImageToBase64(file);
			return base64String;
		} catch (error) {
			console.error('Ошибка конвертации изображения:', error);
		}
	};

	const handleFileUploadAndSetImage = async (file: File) => {
		const base64String = await handleFileUpload(file);
		setCarInfo((prev) => ({
			...prev,
			thumbnail: {
				path: base64String,
			},
		}));
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles) => {
			setImage(acceptedFiles[0]);
			handleFileUploadAndSetImage(acceptedFiles[0]);
		},
	});

	useEffect(() => {
		if (id === undefined) {
			setCarInfo(defaultCarData);
			setImage(null);
			setCheckedColors([]);
		} else {
			const fetchData = async () => {
				try {
					const response = await EntitiesService.getCarOnId(Number(id));

					if (typeof response.colors === 'string') {
						response.colors = response.colors.split(',');
					}
					setCarInfo(response);

					setCheckedColors(response.colors || []);

					setData(response);
				} catch (error) {
					setData(null);
				}
			};
			fetchData();
		}
	}, [id]);

	return (
		<div>
			<h2 className="text-[29px] font-normal text-[#3D5170]">
				Карточка автомобиля
			</h2>
			<div className="mt-8 flex gap-7 h-[calc(100vh_-_300px)] max-xl:flex-col">
				<div className="rounded-lg shadow-2xl w-[330px] max-xl:w-full p-6 flex flex-col gap-5 bg-white">
					<div>
						<div className="py-5">
							<div className="">
								{image ? (
									<div className="w-full">
										<img
											className="w-full object-cover max-h-[170px]"
											src={URL.createObjectURL(image)}
											alt="Uploaded image"
										/>
									</div>
								) : carInfo.thumbnail.path ? (
									<div className="w-full">
										<img
											className="w-full object-cover max-h-[170px]"
											src={carInfo.thumbnail.path}
											alt="Uploaded image"
										/>
									</div>
								) : (
									<div className="flex items-center justify-center text-[100px]">
										?
									</div>
								)}

								<div className="text-center text-[24px]">
									{carInfo.name || 'Новый автомобиль'}
								</div>
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
												value={image ? image.name : ''}
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
							<Progress percent={calculateProgress()} />
						</div>
					</div>
					<div className="flex flex-col py-4 border-t border-[#BECAD6] bg-white overflow-hidden max-xl:w-full">
						<span className="text-[#868E96]">Описание</span>
						<textarea
							className="mt-3 outline-none resize-none"
							name=""
							id=""
							rows={4}
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
					<div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 mt-7">
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
							<div className="flex flex-col mt-5">
								{carInfo.colors.map((color, id) => (
									<Checkbox
										key={id}
										checked={checkedColors.includes(color)}
										onChange={() => {
											setCheckedColors((prev) =>
												prev.includes(color)
													? prev.filter((c) => c !== color)
													: [...prev, color]
											);
										}}
									>
										{color}
									</Checkbox>
								))}
							</div>
						</div>
					</div>
					<div className="mt-auto max-xl:mt-5 flex gap-3">
						<Button type="primary" onClick={handleUpdateCar}>
							Сохранить
						</Button>
						<Button
							type="default"
							onClick={() => {
								window.history.back();
							}}
						>
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
