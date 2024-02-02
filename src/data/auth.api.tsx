import {Api} from "./api.ts";
import {RegisterUserDto} from "./dto/registerUser.dto.ts";
import {RefreshDto} from "./dto/refresh.dto.ts";

export class AuthApi extends Api{
    async login(email: string, password: string): Promise<RefreshDto> {
        const response = await this.axios.post('/auth/login', {'email': email, 'password': password})
        return response.data
    }

    async register(userInfo: RegisterUserDto): Promise<unknown>{
        return await this.axios.post('/auth/register', userInfo)
    }
}