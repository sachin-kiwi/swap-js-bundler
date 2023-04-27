export const baseUrl = 'http://localhost:8001/api/v1/app'
export const appName = 'Swap Utility'

export const appURL = {
    fetchApp:`${baseUrl}/fetchAppOptions`,
    swapToken:`${baseUrl}/swap-token`,
    getQuotes:`${baseUrl}/get-quotes`,
}

export const ACTIONS = {
    post: 'POST',
    get: 'GET'
}