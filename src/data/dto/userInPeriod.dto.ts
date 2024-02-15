import {SwapResponseDto} from "./swapResponse.dto.ts";

export interface UserInPeriodDto{
    id: number
    firstName: string
    secondName: string
    email: string
    active: boolean
    avatar: string
    swap?: number
    swapInfo?: SwapResponseDto
    fromNextPeriod?: boolean
}