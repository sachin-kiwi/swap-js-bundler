import { makeApiRequest } from "../api"
import { appURL } from "../config/constant"

export const addFormListener = (appId) => {
    console.log(appId)
    const quoteBtn = document.getElementById(`get-quote-${appId}`)
    const swapBtn = document.getElementById(`swap-token-${appId}`)
    quoteBtn.addEventListener("click", async function(e){
        e.preventDefault();
        const payload ={
            "appId":"64411e580b5a95672ebcd08d",
            "to":"0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            "from":"0x417B9b9d68529bfE7e1379126acE178156C57f37"
        }
        const data = await makeApiRequest(appURL.getQuotes,'POST',payload)
        console.log(data)
        alert('Latest quote recieved')
    });
    swapBtn.addEventListener("click", async function(e){
        e.preventDefault();
        const payload = {
            "appId":"64411e580b5a95672ebcd08d",
            "to":"0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            "from":"0x417B9b9d68529bfE7e1379126acE178156C57f37"
        }
        const data = await makeApiRequest(appURL.swapToken,'POST',payload)
        console.log(data)
        alert('swap raw tx recieved')
    });
}

