import { makeApiRequest } from "../api"

export const addFormListener = (appId) => {
    console.log(appId)
    const quoteBtn = document.getElementById(`get-quote-${appId}`)
    const swapBtn = document.getElementById(`swap-token-${appId}`)
    console.log(quoteBtn)
    quoteBtn.addEventListener("click", async function(e){
        e.preventDefault();
        const data = await makeApiRequest('http://localhost:8001/api/v1/app/fetchAppOptions','POST',{ appId }).then(data=>data[0])
        alert('Latest quote recived')
    });
    swapBtn.addEventListener("click", async function(e){
        e.preventDefault();
        const data = await makeApiRequest('http://localhost:8001/api/v1/app/fetchAppOptions','POST',{ appId }).then(data=>data[0])
        alert('swap raw tx recieved')
    });
}