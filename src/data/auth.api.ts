import {Api} from "./api.ts";
import {RegisterUserDto} from "./dto/registerUser.dto.ts";
import {TokensDto} from "./dto/tokens.dto.ts";

export class AuthApi extends Api{
    async login(email: string, password: string): Promise<TokensDto> {
        const response = await this.axios.post('/auth/login', {'email': email, 'password': password})
        return response.data
    }

    async register(userInfo: RegisterUserDto): Promise<unknown>{
        return await this.axios.post('/auth/register', userInfo)
    }

    async logout(): Promise<unknown>{
        return await this.axios.post('/auth/logout')
    }

    async getNewRefresh(): Promise<string>{
        const currentRefresh = window.localStorage.getItem('refreshToken')
        const result  = await this.axios.post<TokensDto>('/token/refresh',
            {
                refresh: currentRefresh
            });
        window.localStorage.setItem('refreshToken', result.data.refreshToken)
        return result.data.refreshToken
    }
}