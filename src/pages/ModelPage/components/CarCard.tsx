import { Heading } from '@/components/ui/Heading';
import cn from 'classnames';

interface CarCardProps {
	name: string;
	id: number | null;
	priceMax: number;
	priceMin: number;
	imagePath: string;
	onClick: (id: number, name: string, price: string, colors: string[], number: string, imagePath: string) => void;
	selectedCardId: number;
	colors: string[];
	number: string;
}

export const CarCard = ({
	name,
	id,
	priceMax,
	priceMin,
	imagePath,
	selectedCardId,
	onClick,
	colors,
	number
}: CarCardProps) => {
	const buildPrice = `${priceMin} - ${priceMax}`;
	return (
		<div
			className={cn(
				'relative w-1/2 max-md:w-full h-[224px] p-4 border border-[#EEEEEE] hover:border-gray cursor-pointer overflow-hidden',
				{ 'border-main': selectedCardId == id }
			)}
			onClick={() => onClick(id, name, buildPrice, colors, number, imagePath)}
		>
			<div className="">
				<Heading level="h4" className="uppercase text-[18px]">
					{name}
				</Heading>
				<span className="text-[14px] text-gray">
					{priceMin} - {priceMax}
				</span>
				<img
					src={imagePath}
					alt={name}
					className="absolute w-[256px] bottom-0-0 right-0 -z-10"
				/>
			</div>
		</div>
	);
};
