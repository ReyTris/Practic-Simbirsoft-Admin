import { ISwiperSlide } from '@/components/types/slider';

import GazolineImage from '@/assets/images/gazoline.png';
import InsuranceImage from '@/assets/images/insurance.png';
import ParkingImage from '@/assets/images/parking.png';
import ServicesImage from '@/assets/images/services.png';

export const dataSlider: ISwiperSlide[] = [
	{
		title: 'Бесплатный парковка',
		preview:
			'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
		variantButton: 'darkgreen-to-green',
		imagePath: ParkingImage,
	},
	{
		title: 'Страховка',
		preview: 'Полная страховка страховка автомобиля',
		variantButton: 'blue-to-ocean',
		imagePath: InsuranceImage,
	},
	{
		title: 'Бензин',
		preview: 'Полный бак на любой заправке города за наш счёт',
		variantButton: 'orange-to-red',
		imagePath: GazolineImage,
	},
	{
		title: 'Обслуживание',
		preview: 'Автомобиль проходит еженедельное ТО',
		variantButton: 'darkpurple-to-purple',
		imagePath: ServicesImage,
	},
];
