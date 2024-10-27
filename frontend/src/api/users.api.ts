import { UserProfile } from '../models'
import { httpClient } from '../utils/fetch.client'
import { ACCESS_TOKEN, BASE_URL } from './base'

export const usersApi = {
    getAllUsers: async () => {
        return httpClient.get<{ data: UserProfile[] }>(`${BASE_URL}/users`)
    },

    login: async (credentials: { email: string; password: string }) => {
        return httpClient.post<{ access_token: string }>(
            `${BASE_URL}/auth/login`,
            {
                body: JSON.stringify(credentials),
            },
        )
    },

    getProfile: async () => {
        return httpClient.get<UserProfile>(`${BASE_URL}/api/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
        })
    },

    logout: async () => {
        return httpClient.post<{ message: string }>(`${BASE_URL}/api/logout`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
        })
    },
}
