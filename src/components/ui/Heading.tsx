import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export const Heading = ({ level = 'p', children, className }: HeadingProps) => {
	const HeadingTag = ({
		...props
	}: React.HTMLAttributes<HTMLHeadingElement>) => {
		return React.createElement(level, props, children);
	};

	return <HeadingTag className={className}>{children}</HeadingTag>;
};
