import {User} from "../../context/auth.context.ts";

export interface UserInfoDto{
    email: string
    firstName: string
    secondName: string
    id: number
    startActiveTime: string
    endActiveTime: string
    lastActivePeriod: string
    isSuperAdmin: boolean
    isAdmin: boolean
    active: boolean
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