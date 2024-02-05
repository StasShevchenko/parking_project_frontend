export const delay = async (delayTime: number): Promise<boolean> => {
    return await new Promise((resolve) => setTimeout(() => resolve(true), delayTime))
}