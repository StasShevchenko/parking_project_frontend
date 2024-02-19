export const getErrorCode = (error: any) => {
    return error?.response?.status
}