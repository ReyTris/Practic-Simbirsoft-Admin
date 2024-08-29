import { Button, Form, Input } from 'antd';
import React from 'react';

const Login = () => {
	return (
		<>
			<div className="text-center text-[18px]">Вход</div>
			<Form
				layout="vertical"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 24 }}
				style={{ width: '100%' }}
				className="w-full mt-10"
			>
				<Form.Item
					label="Почта"
					name="Почта"
					rules={[
						{
							required: true,
							type: 'email',
							message: 'Введите в формате name@email.com',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="Пароль" name="Пароль" rules={[{ required: true }]}>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Войти
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Login;
