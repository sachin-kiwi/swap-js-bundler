import $ from 'jquery'
import { SwapScreen, removeSwapScreenListener, swapFormListener } from './swapScreen'
import { createSearchKeyWord } from './utilities'
import { WalletScreen, removeWalletScreenListener, walletFormListener } from './walletScreen'
import Dapp from '../utils/dapp'

export const getAppScreen = async (appId,data) => {
  let ui = ''
  let hasError = false
  try {
    if (typeof data !== 'object' || Object.entries(data).length === 0){
      throw new Error('Fetched empty Data for screen populate.Please check with admin')
    }
    // ui = screenName === 'swapScreen'? SwapScreen({appId,data}) :  WalletScreen({appId,data})
    ui = appScreen({appId,data})
  } catch (error) {
    console.log(error)
    ui = `<div>Something Went Wrong.Please checks console</div>`
    hasError = true
  }
  return {ui,hasError}
}

export const createSwapUtlityScreen = async (screenId, appId,data,screenName) => {
  let element = null
  let hasError = false
  let dapp = null
  let errorMessage = null
  try {
    element = document.getElementById(screenId)
    if (!element) {
      element = createComponent(screenId)
      console.log('created swap utlity screen element')
      const {ui,hasError:foundError} = await getAppScreen(appId,data)
      hasError = foundError === true
      element.innerHTML = ui
      if (!hasError){
        dapp = new Dapp(`app-${appId}`,appId)
        FormListener(screenName,appId,dapp)
      }
    }
    // Element already exists, check if it's unique and has no child elements
    // If Child exist then do nothing screens to current
    // clearComponent(screenId)
    // element.innerHTML = ui
  } catch (error) {
    hasError = true
    console.log(error)
    errorMessage = error.message
  }
  return {element,hasError,dapp,errorMessage}
}

const createComponent = (id,type='div')=>{
  const element = document.createElement(type)
  element.setAttribute('id', id)
  document.body.appendChild(element)
  return element
}

const clearComponent = (id,type='id')=>{
  const name = createSearchKeyWord(id,type)
  if ($(name).children().length !== 0){
    $(name).empty()
    console.log(`Component is empty now :${name}`)
  }
}

export const FormListener = (screenName,appId,dapp)=>{
  walletFormListener(appId,dapp)
  swapFormListener(appId,dapp)
  // if (screenName === 'walletScreen'){
  //   walletFormListener(appId,dapp)
  //   removeSwapScreenListener(appId)
  // } else{
  //   swapFormListener(appId,dapp)
  //   removeWalletScreenListener(appId)
  // }
}

export const appScreen = ({appId,data})=>{
  const childScreen  = SwapScreen({appId,data}) +  WalletScreen({appId,data})
  return `<section id=appScreen-${appId}>${childScreen}</section>`
}
