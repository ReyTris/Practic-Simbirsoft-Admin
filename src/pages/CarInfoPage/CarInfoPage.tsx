import { IDataCar } from '@/models/entities/IEntitiesService';
import { EntitiesService } from '@/services/entities.service';
import { Progress } from 'antd';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';

export const CarInfoPage = () => {
	const { id } = useParams();
	const [data, setData] = useState<IDataCar>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [image, setImage] = useState(null);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles) => {
			setImage(acceptedFiles[0]);
		},
	});

	// const handleImageChange = (event) => {
	// 	setImage(event.target.files[0]);
	// };
	const handleRemoveImage = () => {
		setImage(null);
	};
	console.log(data);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await EntitiesService.getOrderToId(id);
				setData(response);
			} catch (error) {
				setData(null);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);
	return (
		<div className="">
			<h2 className="text-[29px] font-normal text-[#3D5170]">
				Карточка автомобиля
			</h2>
			<div className="mt-8 flex gap-7">
				<div className="rounded-lg shadow-2xl w-[330px] p-6 flex flex-col bg-white">
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
					<div className="py-4 border-t border-[#BECAD6]">
						<span className="text-[#868E96]">Описание</span>
						<textarea
							className="mt-3 outline-none"
							name=""
							id=""
							rows={10}
							cols={30}
						>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et at
							voluptatum obcaecati debitis optio, nam voluptate corrupti ducimus
							quidem expedita consequatur, autem vitae nemo dolorem! Nemo
							repellat consequatur iure vel, vero ab facere accusantium
						</textarea>
					</div>
				</div>
				<div className="flex-1 rounded-lg shadow-2xl w-full p-6 bg-white">
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
								/>
							</div>
						</div>
						<div className="">
							<div className="text-[12px]">Тип автомобиля</div>
							<div className="mt-1 flex rounded border-[0.5px] border-[#BECAD6]">
								<input
									type="text"
									className="p-[10px] outline-none  w-full h-[30px]"
								/>
							</div>
						</div>
						<div className="">
							<div className="text-[12px]">Доступные цвета</div>
							<div className="flex flex-1 gap-2 items-center justify-center mt-1 ">
								<input
									type="text"
									className="p-[10px] outline-none w-full  rounded border-[0.5px] border-[#BECAD6] h-[30px]"
								/>
								<button className="flex items-center justify-center p-[7px] text-[36px] text-[#BECAD6] font-normal w-[30px] h-[30px] rounded border-[0.5px] border-[#BECAD6]">
									+
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
