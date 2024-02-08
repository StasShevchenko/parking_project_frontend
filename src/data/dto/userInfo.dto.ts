import {User} from "../../context/auth.context.ts";

export interface UserInfoDto{
    email: string
    firstName: string
    secondName: string
    id: number
    startDate: Date
    endDate: Date
    lastActiveDate: Date
    isSuperAdmin: boolean
    isAdmin: boolean
    isActive: boolean
    queueUser: boolean
    avatar: string
    swapId: number
    isSwapAvailable: boolean
}

export const getUserRolesString = (user: UserInfoDto | User | undefined): string => {
    const roles = []
    if (user?.isSuperAdmin) {
        roles.push('старший администратор')
    }
    if (user?.isAdmin && !user?.isSuperAdmin) {
        roles.push('администратор');
    }
    if (user?.queueUser) {
        roles.push('пользователь очереди');
    }
    return roles.join(', ')
}