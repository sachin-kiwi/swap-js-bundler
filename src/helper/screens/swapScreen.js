import { makeApiRequest } from '../api'
import { appURL, appName, ACTIONS } from '../config/constant'
import AlertComponent from './alertScreen'
import { createSearchKeyWord } from './utilities'
import $ from 'jquery'

export const SwapScreen = (props) => {
  const {
    appId,
    data: { addressPair },
  } = props
  return `
    <section id="swap-utlity-container-${appId}" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); display: none; border: 3px solid; min-width:500px; padding:1rem">
    <h1 id="title-${appId}" style="font-size: 2rem; font-weight: bold; text-align: center;">${appName}</h1>
    <form id="swap-utility-form-${appId}" style="display: flex; flex-direction: column; align-items: center;">
    <div id="tokenA" style="">
    <label form="tokenA" id="tokenA-label-${appId}" style="font-weight: bold;">${addressPair[0].symbol}</label>
    <input type="number" id="tokenA-value-${appId}" data-address="${addressPair[0].address}" placeholder="${addressPair[0].name}" style="padding: 0.5rem; border-radius: 0.25rem; border: 1px solid gray;"/>
    </div>
    <span id="exchange-icon-${appId}" style="font-size: 2em; cursor: pointer;">&#8597;</span>
    <div id="tokenB" style="margin-bottom: 1rem;">
    <label form="tokenB" id="tokenB-label-${appId}" style="font-weight: bold;">${addressPair[1].symbol}</label>
    <input type="number" id="tokenB-value-${appId}" class=disable-btn disabled data-address="${addressPair[1].address}" placeholder="${addressPair[1].name}" style="padding: 0.5rem; border-radius: 0.25rem; border: 1px solid gray;"/>
    </div>
    <div id="misc-${appId}" style="margin-bottom:1rem;">
    <label form="slippage" id="slippage-label-${appId}" style="font-weight: bold;">Tolerance (%)</label>
    <input type="number" id="slippage-value-${appId}" placeholder="0" style="padding: 0.5rem; border-radius: 0.25rem; border: 1px solid gray;"/>
    <div id="misc-options-${appId}" style="margin-bottom: 1rem;">
    <label form="raw-tx" style="font-weight: bold;">Is Raw Tx?</label>
    <input type="checkbox" id="rawTx-option-${appId}" name="raw-tx-option" checked="true"/>
    </div>
    </div>
    <input type="submit" id="get-quote-${appId}" value="Get Quote" style="background-color: lightgray; border: none; border-radius: 0.25rem; padding: 0.5rem 1rem; margin-bottom: 1rem;"/>
    <input type="submit" id="swap-token-${appId}" value="Swap Token" style="background-color: lightblue; border: none; border-radius: 0.25rem; padding: 0.5rem 1rem; margin-bottom: 1rem;"/>
    </form>
    <input type="submit" id="disConnect-swapScreen-${appId}" value="DisConnect" style="background-color: lightblue; border: none; border-radius: 0.25rem; padding: 0.5rem; margin-top: 1rem; width: 100%;"/>
    </section>
    <style>
    .disable-btn{
      background-color:lightgray;
    }
    </style>
  `
}

export const swapFormListener = (appId,dapp) => {
  const alertBox = new AlertComponent(appId)
  const quoteBtn = document.getElementById(`get-quote-${appId}`)
  const swapBtn = document.getElementById(`swap-token-${appId}`)
  const exchangeBtn = document.getElementById(`exchange-icon-${appId}`)
  const disConnectBtn = document.getElementById(`disConnect-swapScreen-${appId}`)
  quoteBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    const isValid = swapScreenFormValidation(appId, alertBox)
    if (!isValid) {
      return
    }
    const { from, to } = await fetchInputDetails(appId,alertBox)
    const payload = {
      appId,
      from,
      to,
    }
    const data = await makeApiRequest(appURL.getQuotes, ACTIONS.post, payload)
    alertBox.showAlert('Latest quote recieved','success')
  })
  exchangeBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    setExchangeFields(appId)
  })
  swapBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    const isValid = swapScreenFormValidation(appId, alertBox)
    if (!isValid) {
      return
    }
    const { from, to } = await fetchInputDetails(appId)
    const payload = {
      appId,
      from,
      to,
    }
    const data = await makeApiRequest(appURL.swapToken, ACTIONS.post, payload)
    alertBox.showAlert('swap raw tx recieved','success')
  })

  disConnectBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    const swapScreen = document.getElementById(`swap-utlity-container-${appId}`)
    const walletScreen = document.getElementById(`walletScreen-container-${appId}`)
    swapScreen.style.display = 'none'
    walletScreen.style.display = 'block'
    await dapp.disconnectApp()
    alertBox.showAlert('Disconnected','info')

  })
}

export const swapScreenFormValidation = (appId, alertBox) => {
  const tokenA = $(createSearchKeyWord(`tokenA-value-${appId}`, 'id')).val()
  const tokenB = $(createSearchKeyWord(`tokenB-value-${appId}`, 'id')).val()
  if (tokenA === '' || tokenB === '') {
    alertBox.showAlert('please enter all details before submitting')
    return false
  }
  return true
}

const setExchangeFields = (appId) => {
  const form = document.getElementById(`swap-utility-form-${appId}`)
  if (!form) return
  const [tokenAInput, tokenBInput] = ['#tokenA input','#tokenB input',]
    .map((selector) => form.querySelector(selector))
  if (tokenAInput.disabled){
    tokenAInput.disabled=false
    tokenBInput.disabled = true
    tokenBInput.classList.add('disable-btn')
    tokenAInput.classList.remove('disable-btn')
  }else{
    tokenAInput.disabled=true
    tokenBInput.disabled = false
    tokenAInput.classList.add('disable-btn')
    tokenBInput.classList.remove('disable-btn')
  }
}

const fetchInputDetails = (appId,alertBox) => {
  try {
    const form = document.getElementById(`swap-utility-form-${appId}`)
    if (!form) return
    const [tokenAInput, tokenBInput] = [
      '#tokenA input',
      '#tokenB input',
    ].map((selector) => form.querySelector(selector))
    const isRawTx = form.querySelector(`#rawTx-option-${appId}`).checked
    const [tokenA, tokenB] = [tokenAInput, tokenBInput].map((input) => {
      return { address: input.dataset.address, amount: input.value }
    })
    return {
      from: tokenA.address,
      amountIn: tokenA.amount,
      to: tokenB.address,
      amountOut: tokenB.amount,
      isRawTx,
    }
  } catch (error) {
    console.log(error)
    alertBox.showAlert(error.message)
  }
}
