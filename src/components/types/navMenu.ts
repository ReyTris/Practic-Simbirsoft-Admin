export interface INavMenuLink {
	title: string;
	link: string;
	onClick?: () => void;
}

export interface IOrderMenuLink extends INavMenuLink {
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	isActived: boolean;
}

export interface ISocialLink {
	link: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
