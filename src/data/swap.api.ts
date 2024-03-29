import {Api} from "./api.ts";
import {SendSwapRequestDto} from "./dto/sendSwapRequest.dto.ts";
import {SwapResponseDto} from "./dto/swapResponse.dto.ts";
import {AcceptDeclineSwapDto} from "./dto/acceptDeclineSwap.dto.ts";

export class SwapApi extends Api{
    static getSwapRequestsKey = 'getSwapRequestsByUserId'
    async sendSwapRequest(dto: SendSwapRequestDto) {
        await this.axios.post('/swap/create', dto)
    }

    async getSwapRequestsByUserId(userId: number): Promise<SwapResponseDto[]>{
        const result = await this.axios.get(`/swap/${userId}`)
        return result.data
    }

    async processSwapRequest(dto: AcceptDeclineSwapDto) {
        await this.axios.post('/swap/processSwapRequest', dto)
    }

}