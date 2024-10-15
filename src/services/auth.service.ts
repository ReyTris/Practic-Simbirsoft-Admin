import { $api } from '@/api/api';
import { IAuthResponse } from '@/models/auth/IAuthResponse';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const secret = '4cbcea96de'

export function generateRandomHash(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
const randomHash = generateRandomHash()
const basicToken = btoa(`${randomHash}:${secret}`)

export const AuthService = {
    async login(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {

        return await $api.post('auth/login/', {
            username: 'intern', password: 'intern-S!'
        }, {
            headers: {
                'Authorization': `Basic ${basicToken}`
            }
        })
    },

    async refreshToken(): Promise<AxiosResponse<IAuthResponse>> {
        const refresh = localStorage.getItem('refreshToken')

        return await $api.post('auth/refresh/', {
            refresh_token: refresh
        }, {
            headers: {
                'Authorization': `Basic ${basicToken}`
            }
        })
    },

    async logout() {
        const navigate = useNavigate()
        await $api.post('auth/logout/', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        // navigate('/auth/login')
    }
}