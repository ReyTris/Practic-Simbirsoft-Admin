import { ChangeEvent } from 'react';

interface InputProps {
	type: 'text' | 'number' | 'email' | 'password';
	name: string;
	label: string;
	value: string | number;
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

export const Input = ({
	type,
	name,
	label,
	value,
	placeholder,
	onChange,
	className,
}: InputProps) => {
	return (
		<div className='flex mt-2 first-of-type:mt-0'>
			<label className='mr-3 text-sm' htmlFor={label}>
				{label}
			</label>
			<div className='pb-[2px] px-1 border-b border-black w-fit'>
				<input
					className='outline-none'
					id={label}
					type={type}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
