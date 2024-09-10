import { useAppDispatch } from '@/hooks/useDispatch';
import { loginUser } from '@/store/userSlice';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

const Login = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useAppDispatch()


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
							// type: 'email',
							message: 'Введите в формате name@email.com',
						},
					]}
					
				>
					<Input onChange={(e) => setLogin(e.target.value)}/>
				</Form.Item>
				<Form.Item label="Пароль" name="Пароль" rules={[{ required: true }]}>
					<Input.Password onChange={(e) => setPassword(e.target.value)} />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" onClick={() => dispatch(loginUser({login, password}))}>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Login;
