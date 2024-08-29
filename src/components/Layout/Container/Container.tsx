import cn from 'classnames';
import { PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
	className?: string;
}

export const Container = ({ className, children }: ContainerProps) => {
	return (
		<div
			className={cn(
				'h-full w-full min-w-[320px] px-[64px] max-md:px-[16px] max-lg:px-[32px]',
				className
			)}
		>
			{children}
		</div>
	);
};
