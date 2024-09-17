import { useAppDispatch } from '@/hooks/useDispatch';
import { loginUser } from '@/store/userSlice';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setLogin(value);
    setLoginError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value);
    setPasswordError(null);
  };

  const handleSubmit = () => {
    if (!login) {
      setLoginError('Введите почту');
    }
    if (!password) {
      setPasswordError('Введите пароль');
    }
    if (login && password) {
      dispatch(loginUser({ login, password }));
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(login);

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
				message: 'Введите почту',
			  },
			  {
				type: 'email',
				message: 'Введите в формате name@email.com',
			  },
          ]}
          help={loginError}
        >
          <Input onChange={handleLoginChange} maxLength={150} />
        </Form.Item>
        <Form.Item label="Пароль" name="Пароль" rules={[{ required: true, message: 'Введите пароль' }]} help={passwordError}>
          <Input.Password onChange={handlePasswordChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='max-w-[120px] ml-auto'>
          <Button type="primary" onClick={handleSubmit} disabled={!isEmailValid || !login || !password} className='w-full'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;