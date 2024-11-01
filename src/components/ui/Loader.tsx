import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const Loader = () => {
	return (
		<div>
			<Flex align="center" gap="middle">
				<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
			</Flex>
		</div>
	);
};

export default Loader;
