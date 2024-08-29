import MainLogo from '@/assets/icons/Logo.svg';
import PointIcon from '@/assets/icons/point.svg';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { PathNames } from '@/router/pathNames';
import cn from 'classnames';

interface HeaderProps {
	className?: string;
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<div
			className={cn(
				'flex justify-between py-[32px] max-md:flex-col max-md:items-end',
				className
			)}
		>
			<Button to={PathNames.MAIN_PAGE}><MainLogo /></Button>
			<div className="flex items-center max-md:mt-2">
				<PointIcon className="mr-2" />
				<Heading level="p"> Ульяновск </Heading>
			</div>
		</div>
	);
};
