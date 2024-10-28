import cn from 'classnames';

interface IMessageProps {
	message: string;
	type: string;
	state: boolean;
}
const Message = ({ message, type, state }: IMessageProps) => {
	return (
		<div className={cn('w-full h-[30px]', state ? 'block' : 'hidden')}></div>
	);
};

export default Message;
