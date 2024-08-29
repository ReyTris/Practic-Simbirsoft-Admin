import cn from 'classnames';
import { NavLink } from 'react-router-dom';


type Variant = 'darkgreen-to-green' | 'blue-to-ocean' | 'orange-to-red' | 'darkpurple-to-purple' | 'green-to-darkgreen';

interface ButtonProps {
	to?: string;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	children: React.ReactNode;
	variant?: Variant;
}

export const Button = ({
	to,
	className,
	onClick,
	disabled,
	children,
	variant,
}: ButtonProps) => {
	const variantStyles: Record<Variant, string> = {
		'darkgreen-to-green':
			'bg-gradient-to-r from-[#13493F] to-[#0C7B1B] transition-all hover:brightness-90 active:brightness-75',
		'blue-to-ocean':
			'bg-gradient-to-r from-[#132949] to-[#0C7B67] transition-all hover:brightness-90 active:brightness-75',
		'orange-to-red':
			'bg-gradient-to-r from-[#493013] to-[#7B0C3B] transition-all hover:brightness-90 active:brightness-75',
		'darkpurple-to-purple':
			'bg-gradient-to-r from-[#281349] to-[#720C7B] transition-all hover:brightness-90 active:brightness-75',
		'green-to-darkgreen':
			'bg-gradient-to-r from-[#0EC261] to-[#039F67] transition-all hover:brightness-90 active:brightness-75',
	};

	const buttonVariant = variantStyles[variant];

	if (to) {
		return (
			<NavLink
				to={to}
				className={cn('button inline-block', buttonVariant, className)}
			>
				{children}
			</NavLink>
		);
	} else {
		return (
			<button
				onClick={onClick}
				className={cn('button', buttonVariant, className)}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
};
