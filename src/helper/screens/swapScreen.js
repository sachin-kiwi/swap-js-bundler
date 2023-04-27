import { makeApiRequest } from "../api"
import { appURL,appName, ACTIONS } from "../config/constant"
import { createSearchKeyWord } from "./utilities"
import $ from 'jquery'
export const SwapScreen = (props)=>{
    const {appId,data:{addressPair}} = props
    return <>
        <section id={`swap-utlity-container-${appId}`}>
            <h1 id={`title-${appId}`}>{`${appName}`}</h1>
            <form id={`swap-utility-form-${appId}`}>
                <div id="tokenA">
                    <label form="tokenA" id={`tokenA-label-${appId}`}>{`${addressPair[0].name}`}</label>
                    <input type="number" id={`tokenA-value-${appId}`} data-address={`${addressPair[0].address}`} placeholder={`${addressPair[0].symbol}`}/>
                </div>
                <br/>
                <span id={`exchange-icon-${appId}`} style={{paddingLeft:'3rem'}}>&#8597;</span>
                <br/>
                <div id="tokenB">
                    <label form="tokenB" id={`tokenB-label-${appId}`}>{`${addressPair[1].name}`}</label>
                    <input type="number" id={`tokenB-value-${appId}`} data-address={`${addressPair[1].address}`} placeholder={`${addressPair[1].symbol}`}/>
                </div>
                <br/>
                <input type='submit' id={`get-quote-${appId}`} value='Get Quote'/>
                <br/>
                <input type='submit' id={`swap-token-${appId}`} value='Swap Token'/>
            </form>
        </section>
    </>
}

export const swapFormListener = (appId) => {
    const quoteBtn = document.getElementById(`get-quote-${appId}`)
    const swapBtn = document.getElementById(`swap-token-${appId}`)
    const exchangeBtn = document.getElementById(`exchange-icon-${appId}`)
    quoteBtn.addEventListener("click", async function(e){
        e.preventDefault();
        const isValid = swapScreenFormValidation(appId)
        if (!isValid){
            return
        }
        const payload ={
            appId,
            "to":"0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            "from":"0x417B9b9d68529bfE7e1379126acE178156C57f37"
        }
        const data = await makeApiRequest(appURL.getQuotes,ACTIONS.post,payload)
        console.log(data)
        console.log('Latest quote recieved')
    });
    exchangeBtn.addEventListener("click", async function(e){
        e.preventDefault();
        setExchangeFields(appId)
    });
    swapBtn.addEventListener("click", async function(e){
        e.preventDefault();
        const isValid = swapScreenFormValidation(appId)
        if (!isValid){
            return
        }
        const payload = {
            appId,
            "to":"0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            "from":"0x417B9b9d68529bfE7e1379126acE178156C57f37"
        }
        const data = await makeApiRequest(appURL.swapToken,ACTIONS.post,payload)
        console.log(data)
        console.log('swap raw tx recieved')
    });
}

export const swapScreenFormValidation = (appId)=>{
    const tokenA = $(createSearchKeyWord(`tokenA-value-${appId}`,'id')).val()
    const tokenB = $(createSearchKeyWord(`tokenB-value-${appId}`,'id')).val()
    if (tokenA === '' || tokenB === ''){
        console.log('please enter all details before submitting')
        return false
    }
    return true
}

const setExchangeFields = (appId) => {
    const form = document.getElementById(`swap-utility-form-${appId}`);
    if (!form) return;

    const [tokenAInput, tokenALabel, tokenBInput, tokenBLabel] = [
        '#tokenA input', '#tokenA label', '#tokenB input', '#tokenB label'
    ].map(selector => form.querySelector(selector));

    const [placeholderA, placeholderB] = [tokenAInput, tokenBInput].map(input => input.placeholder);
    const [dataA, dataB] = [tokenAInput, tokenBInput].map(input => input.dataset.address);
    const [labelA, labelB] = [tokenALabel,tokenBLabel].map(input=>input.innerHTML);

    // Save the original values
    const originalValues = {
        placeholderA: tokenAInput.placeholder,
        placeholderB: tokenBInput.placeholder,
        dataA: tokenAInput.dataset.address,
        dataB: tokenBInput.dataset.address,
        labelA: tokenALabel.innerHTML,
        labelB: tokenBLabel.innerHTML,
    };

    try {
        tokenAInput.placeholder = placeholderB;
        tokenAInput.dataset.address = dataB;
        tokenALabel.innerHTML = labelB;
        tokenBLabel.innerHTML = labelA;
        tokenBInput.placeholder = placeholderA;
        tokenBInput.dataset.address = dataA;
    } catch (error) {
        // If an error occurs, revert back to the original values
        tokenAInput.placeholder = originalValues.placeholderA;
        tokenBInput.placeholder = originalValues.placeholderB;
        tokenAInput.dataset.address = originalValues.dataA;
        tokenBInput.dataset.address = originalValues.dataB;
        tokenALabel.innerHTML = originalValues.labelA;
        tokenBLabel.innerHTML = originalValues.labelB;
        console.log(error);
    }
};
