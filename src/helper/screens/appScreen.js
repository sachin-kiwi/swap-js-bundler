import $ from 'jquery'
import { SwapScreen, swapFormListener } from './swapScreen'
import { createSearchKeyWord } from './utilities'

export const getAppScreen = async (appId,data) => {
  let ui = ''
  let hasError = false
  try {
    if (typeof data !== 'object' || Object.entries(data).length === 0){
      throw new Error('Fetched empty Data for screen populate.Please check with admin')
    }
    ui = SwapScreen({appId,data})
  } catch (error) {
    console.log(error)
    ui = `<div>Something Went Wrong.Please checks console</div>`
    hasError = true
  }
  return {ui,hasError}
}

export const createSwapUtlityScreen = async (screenId, appId,data) => {
  let element = null
  let hasError = false
  try {
    element = document.getElementById(screenId)
    if (!element) {
      element = createComponent(screenId)
      console.log('created swap utlity screen element')
    }
    // Element already exists, check if it's unique and has no child elements
    // If Child exist then remove them first before changing html
    clearComponent(screenId)
    const {ui,hasError:foundError} = await getAppScreen(appId,data)
    hasError = foundError === true
    element.innerHTML = ui
  } catch (error) {
    console.log(error)
  }
  return {element,hasError}
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

export const FormListener = (screenName,appId)=>{
  if (screenName === 'swapScreen'){
    swapFormListener(appId)
  }else{
    //do nothing
  }
}

export const switchAppScreen = (screenId,appId,screenName) =>{
  return ``
}