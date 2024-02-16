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

    async getNewToken(): Promise<string>{
        const result  = await this.axios.post<TokensDto>('/token/refresh');
        window.localStorage.setItem('accessToken', result.data.accessToken)
        return result.data.accessToken
    }
}