import axios from "axios";
import {AuthContextType} from "../../context/auth.context.ts";
import {TokensDto} from "../dto/tokens.dto.ts";


export class AxiosClient {
    private static instance?: AxiosClient
    private accessToken: string | null = localStorage.getItem('accessToken')

    private client = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        withCredentials: true
    })

    private constructor(authContext: AuthContextType) {
        localStorage.setItem('isRefreshing', 'false')
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
                    window.localStorage.removeItem('accessToken')
                    if (localStorage.getItem('isRefreshing') !== 'true') {
                        localStorage.setItem('isRefreshing', 'true')
                        let refreshData;
                        try {
                            refreshData = await this.client.post<TokensDto>('/token/refresh');
                        } catch (error) {
                            window.localStorage.removeItem('refreshToken')
                            authContext.setAuthState({
                                ...authContext.authState,
                                isAuthenticated: 'false'
                            })
                            return Promise.reject(error)
                        }
                        const {data} = refreshData;
                        window.localStorage.setItem('accessToken', data.accessToken)
                        this.client.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`
                        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
                        this.accessToken = data.accessToken
                        localStorage.setItem('isRefreshing', 'false')
                        return this.client(originalRequest)
                    } else{
                        return Promise.reject(error)
                    }
                } else {
                    return Promise.reject(error)
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