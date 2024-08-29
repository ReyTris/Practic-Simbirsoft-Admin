import Burger from '@/components/Burger';
import { Button } from '@/components/ui/Button';

export interface SidebarProps {
	handlerNavMenu: () => void;
	isBurgerOpen: boolean;
}

export const Sidebar = ({ handlerNavMenu, isBurgerOpen }: SidebarProps) => {
	return (
		<div className="flex flex-col items-center w-sidebar bg-[#151B1F] py-[32px] max-md:bg-transparent max-md:absolute">
			<Burger handlerNavMenu={handlerNavMenu} isOpen={isBurgerOpen} />
			<Button className="p-[10px] mt-auto max-lg:hidden text-main border-white rounded-[50%] transition-colors hover:border-2 hover:text-white active:text-main">
				Eng
			</Button>
		</div>
	);
};
