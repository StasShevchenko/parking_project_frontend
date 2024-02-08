import {Api} from "./api.ts";
import {UserInfoDto} from "./dto/userInfo.dto.ts";
import {Role} from "../context/auth.context.ts";

export class UserApi extends Api{
    static getAllUsersKey = 'getAllUsers'
    static getUserByIdKey = 'getUser'
    async getAllUsers({roles = [], fullName = ''}: {roles?: Role[], fullName?: string}): Promise<UserInfoDto[]> {
        const response = await this.axios.get<UserInfoDto[]>('/user',{
            params: {
                fullName: fullName,
                roles: roles.toString()
            }
        })
        return  response.data.sort((o1, o2) => o1.firstName.localeCompare(o2.firstName))
    }

    async getUserById({userId}: { userId: number}): Promise<UserInfoDto>{
        const response = await this.axios.get<UserInfoDto>(`/user/${userId}`)
        return response.data
    }
}