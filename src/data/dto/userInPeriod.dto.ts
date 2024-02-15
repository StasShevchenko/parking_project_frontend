import {SwapDto} from "./swap.dto.ts";

export interface UserInPeriodDto{
    id: number
    firstName: string
    secondName: string
    email: string
    active: boolean
    avatar: string
    swap?: number
    swapInfo?: SwapDto
    fromNextPeriod?: boolean
}