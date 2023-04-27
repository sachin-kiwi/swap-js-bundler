import { makeApiRequest } from "../api"
import { appURL,appName, ACTIONS } from "../config/constant"

export const SwapScreen = (props)=>{
    const {appId,data:{addressPair}} = props
    return <>
        <section id={`swap-utlity-container-${appId}`}>
            <h1 id={`title-${appId}`}>{`${appName}`}</h1>
            <form id={`swap-utility-form-${appId}`}>
                <label form="tokenA">{`${addressPair[0].name}`}</label>
                <input type="text" id={`tokenA-value-${appId}`} placeholder={`${addressPair[0].symbol}`}/>
                <br/>
                <label form="tokenB">{`${addressPair[1].name}`}</label>
                <input type="text" id={`tokenB-value-${appId}`} placeholder={`${addressPair[1].symbol}`}/>
                <br/>
                <input type='submit' id={`get-quote-${appId}`} value='Get Quote'/>
                <br/>
                <input type='submit' id={`swap-token-${appId}`} value='Swap Token'/>
            </form>
        </section>
    </>
}

export const swapFormListener = (appId) => {
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
        const data = await makeApiRequest(appURL.getQuotes,ACTIONS.post,payload)
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
        const data = await makeApiRequest(appURL.swapToken,ACTIONS.post,payload)
        console.log(data)
        alert('swap raw tx recieved')
    });
}

export const swapScreenFormValidation = ()=>{
    return ''
}