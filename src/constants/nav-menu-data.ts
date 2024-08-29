import InstagramIcon from '@/assets/icons/Instagram.svg';
import FBIcon from '@/assets/icons/fb.svg';
import OrderArrowIcon from '@/assets/icons/orderArrow.svg';
import TelegramIcon from '@/assets/icons/telega.svg';
import {
	INavMenuLink,
	IOrderMenuLink,
	ISocialLink,
} from '@/components/types/navMenu';
import { PathNames } from '@/router/pathNames';
export const dataNavMenu: INavMenuLink[] = [
	{ title: 'Парковка', link: PathNames.PARKING_PAGE },
	{ title: 'Страховка', link: PathNames.INSURANCE_PAGE },
	{ title: 'Бензин', link: PathNames.GASOLINE_PAGE },
	{ title: 'Обслуживание', link: PathNames.SERVICE_PAGE },
];

export const dataOrderMenu: IOrderMenuLink[] = [
	{
		title: 'Местоположение',
		link: `${PathNames.ORDER_PAGE}/${PathNames.POSITION_PAGE}`,
		icon: OrderArrowIcon,
		isActived: false,
	},
	{
		title: 'Модель',
		link: `${PathNames.ORDER_PAGE}/${PathNames.MODEL_PAGE}`,
		icon: OrderArrowIcon,
		isActived: false,
	},
	{
		title: 'Дополнительно',
		link: `${PathNames.ORDER_PAGE}/${PathNames.ADDITIONAL_PAGE}`,
		icon: OrderArrowIcon,
		isActived: false,
	},
	{
		title: 'Итого',
		link: `${PathNames.ORDER_PAGE}/${PathNames.SUMMARY_PAGE}`,
		isActived: false,
	},
];

export const socialLinks: ISocialLink[] = [
	{ link: '#', icon: TelegramIcon },
	{ link: '#', icon: FBIcon },
	{ link: '#', icon: InstagramIcon },
];
