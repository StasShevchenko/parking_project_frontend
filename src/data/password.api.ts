import {Api} from "./api.ts";
import {ForgotChangePasswordDto} from "./dto/forgotChangePassword.dto.ts";

export class PasswordApi extends Api{
    async sendForgotPasswordKey(dto: { email: string }) {
        await this.axios.post('/user/forgotPassword', dto)
    }

    async reviewMailKey(dto: {key: number}): Promise<string>{
        const {data} = await this.axios.post('/user/reviewKey', dto)
        return data
    }

    async forgotPassword(dto: ForgotChangePasswordDto) {
        await this.axios.post('/user/forgotPasswordChange', dto)
    }
}