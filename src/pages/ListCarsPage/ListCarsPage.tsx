import { useEffect, useState } from 'react';
import CarItem from './components/CarItem';
import { ICarId } from '@/models/entities/IEntitiesService';
import { EntitiesService } from '@/services/entities.service';
import Loader from '@/components/ui/Loader';
import { Pagination, PaginationProps } from 'antd';

export const ListCarsPage = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<ICarId>({ count: 0, data: [] });

	console.log(data);

	const itemRender: PaginationProps['itemRender'] = (
		_,
		type,
		originalElement
	) => {
		if (type === 'prev') {
			return <a className="text-[20px]">&laquo;</a>;
		}
		if (type === 'next') {
			return <a className="text-[20px]">&raquo;</a>;
		}
		return originalElement;
	};

	const fetchData = async (page: number, limit: number) => {
		try {
			setIsLoading(true);
			const response: ICarId = await EntitiesService.getCars(page, limit);
			setData(response);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
		current,
		pageSize
	) => {
		setPage(current);
		setLimit(pageSize);
		fetchData(current, pageSize);
	};

	useEffect(() => {
		fetchData(page - 1, limit);
	}, [page]);
	return (
		<div>
			<h2 className="text-[29px] font-normal text-[#3D5170]">
				Список автомобилей
			</h2>
			<div className="relative h-[calc(100vh_-_300px)] overflow-hidden overflow-y-auto mt-8 max-lg:mt-4 rounded-lg shadow-2xl">
				<div className="">
					{isLoading ? (
						<div className="flex items-center justify-center py-14">
							<Loader />
						</div>
					) : data.data.length === 0 ? (
						<div className="text-center text-[50px] py-10">
							Ничего не найдено
						</div>
					) : (
						data.data.map((item) => <CarItem key={item.id} item={item} />)
					)}
					<Pagination
						defaultCurrent={1}
						total={data.count}
						onChange={(page) => {
							setPage(page);
						}}
						className="py-[21px] border-t-[1px] border-[#E5E5E5] text-center sticky bottom-0 bg-[#F5F6F8]"
						itemRender={itemRender}
						onShowSizeChange={onShowSizeChange}
					/>
				</div>
			</div>
		</div>
	);
};
