import cn from 'classnames';

interface IMessageProps {
	message: string;
	bgColor: string;
	state: boolean;
}
export const Message = ({ message, bgColor, state }: IMessageProps) => {
	return (
		<div
			className={cn(
				'w-full text-white absolute top-0 left-0 px-7 py-4',
				state ? 'block' : 'hidden'
			)}
			style={{ backgroundColor: bgColor }}
		>
			{message}
		</div>
	);
};
