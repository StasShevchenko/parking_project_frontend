import {Api} from "./api.ts";
import {UserInfoDto} from "./dto/userInfo.dto.ts";
import {Role} from "../context/auth.context.ts";
import {ToggleAdminRoleDto} from "./dto/toggleAdminRole.dto.ts";

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

    async toggleAdminRole({userId, isAdmin}: {userId: number, isAdmin: boolean}): Promise<unknown>{
        if (isAdmin) {
            await this.axios.post<unknown, unknown, ToggleAdminRoleDto>('/user/deleteAdminRole', {
                userId: userId
            })
            return
        } else{
            await this.axios.post<unknown, unknown, ToggleAdminRoleDto>('/user/addAdminRole', {
                userId: userId
            })
            return
        }
    }
}