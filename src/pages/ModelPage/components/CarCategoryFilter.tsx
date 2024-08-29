import { radioData } from '@/constants/radioData';
import { Radio, RadioChangeEvent } from 'antd';

interface CarCategoryFilterProps {
	radioValue: string;
	onRadioChange: (e: RadioChangeEvent) => void;
}

export const CarCategoryFilter = ({
	radioValue,
	onRadioChange,
}: CarCategoryFilterProps) => {
	return (
		<>
			<Radio.Group
				className="radio-custom"
				onChange={onRadioChange}
				value={radioValue}
			>
				{radioData.map(({ value, preview }) => {
					return (
						<Radio key={value} value={value}>
							{preview}
						</Radio>
					);
				})}
			</Radio.Group>
		</>
	);
};
