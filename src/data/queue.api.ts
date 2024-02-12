import {Api} from "./api.ts";
import {PeriodDto} from "./dto/period.dto.ts";

export class QueueApi extends Api{
    static getQueueKey = 'getQueue'
    async getQueue({fullName, isAdmin}: {fullName: string, isAdmin: boolean}): Promise<PeriodDto[][]>{
        const url = isAdmin ? '/queue/getOneNextPeriod' : '/queue/getThisPeriod'
        const {data} = await this.axios.get(url, {
            params: {
                fullName: fullName
            }
        })
        return data
    }
}