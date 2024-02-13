export interface SwapResponseDto{
    id: number
    isActive: boolean
    result: boolean
    sent: string
    swapInfo: SwapInfo
    sender: SwapUserInfo
    receiver: SwapUserInfo
}

interface SwapInfo {
    from: string
    to: string
}
interface SwapUserInfo {
    id: number
    fullName: string
    email:string
}