import $ from 'jquery'
import { SwapScreen, swapFormListener } from './swapScreen'
import { createSearchKeyWord, jsxToHtml } from './utilities'

export const getAppScreen = async (appId,data) => {
  let ui = ''
  try {
    ui =  jsxToHtml(<SwapScreen appId={appId} data={data}/>)
  } catch (error) {
    console.log(error)
    return `<div>Something Went Wrong.Please checks console</div>`
  }
  return ui
}

export const createSwapUtlityScreen = async (screenId, appId,data) => {
  let element = null
  try {
    element = document.getElementById(screenId)
    if (!element) {
      element = createComponent(screenId)
      console.log('created swap utlity screen element')
    }
    // Element already exists, check if it's unique and has no child elements
    // If Child exist then remove them first before changing html
    clearComponent(screenId)
    element.innerHTML = await getAppScreen(appId,data)
    return element
  } catch (error) {
    console.log(error)
  }
  return element
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