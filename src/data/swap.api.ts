import {Api} from "./api.ts";
import {SendSwapRequestDto} from "./dto/sendSwapRequest.dto.ts";

export class SwapApi extends Api{
    async sendSwapRequest(dto: SendSwapRequestDto) {
        await this.axios.post('/swap/create', dto)
    }
}