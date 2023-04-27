import $ from 'jquery'
import React from "react";
import ReactDOMServer from 'react-dom/server';
const jsxToHtml = (input) => ReactDOMServer.renderToString(input)

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
  const name =`${type==='id'? '#':''}${id}`
  if ($(name).children().length !== 0){
    $(name).empty()
    console.log(`Component is empty now :${name}`)
  }
}

const SwapScreen = (props)=>{
    const {appId,data:{addressPair}} = props
    return <>
        <section id={`swap-utlity-container-${appId}`}>
            <h1 id={`title-${appId}`}>Swap Utility</h1>
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