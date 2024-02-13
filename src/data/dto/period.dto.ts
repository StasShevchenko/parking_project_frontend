import {UserInPeriodDto} from "./userInPeriod.dto.ts";

export interface PeriodDto{
    startTime: string
    endTime: string
    nextUsers: UserInPeriodDto[]
}