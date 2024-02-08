import axios from "axios";
import {AuthContextType} from "../context/auth.context.ts";
import {TokensDto} from "./dto/tokens.dto.ts";


export class AxiosClient {
    private static instance?: AxiosClient
    private accessToken: string = ''

    private client = axios.create({
        baseURL: 'http://localhost:3000',
    })

    private constructor(authContext: AuthContextType) {
        this.client.interceptors.request.use((config) => {
            if (this.accessToken) {
                config.headers.Authorization = `Bearer ${this.accessToken}`
            }
            return config;
        })
        this.client.interceptors.response.use(
            (value) => {
                return value
            },
            async (error) => {
                const originalRequest = error.config
                if (error.response.status === 401 && !originalRequest.retry) {
                    originalRequest.retry = true
                    const currentRefreshToken = window.localStorage.getItem('refreshToken')
                    if (currentRefreshToken != null) {
                        window.localStorage.removeItem('refreshToken')
                        let refreshData
                        try {
                            refreshData = await this.client.post<TokensDto>('/token/refresh',
                                {
                                    refresh: currentRefreshToken
                                });
                        } catch (error) {
                            window.localStorage.removeItem('refreshToken')
                            authContext.setAuthState({
                                ...authContext.authState,
                                isAuthenticated: 'false'
                            })
                            return Promise.reject(error)
                        }
                        const {data} = refreshData;
                        window.localStorage.setItem('refreshToken', data.refreshToken)
                        this.client.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`
                        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
                        this.accessToken = data.accessToken
                        return this.client(originalRequest)
                    } else {
                        return Promise.reject(error)
                    }
                } else {
                    return Promise.reject(error);
                }
            }
        )
    }

    static get(authContext: AuthContextType) {
        if (this.instance == null) {
            this.instance = new AxiosClient(authContext)
        }
        return this.instance.client
    }
}