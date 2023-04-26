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

export const getElementByIdOrCreate = async (screenId, appId,data) => {
  let element = null
  try {
    element = document.getElementById(screenId)
    if (!element) {
      // Element doesn't exist, so create it
      const parent = document.createElement('div')
      parent.setAttribute('id', screenId)
      document.body.appendChild(parent)
      element = parent
      console.log('creating element')
    }
    // Element already exists, check if it's unique and has no child elements
    // If Child exist then delete them first
    const childrenCount = $(`#${screenId}`).children().length
    if (childrenCount !== 0) {
      console.log(
        `Element with ID ${screenId} have ${childrenCount} child elements exist and deleting it`,
      )
      $(`#${screenId}`).empty()
    }
    const htmlToAdd = await getAppScreen(appId,data)
    element.innerHTML = htmlToAdd
    return element
  } catch (error) {
    console.log(error)
  }
  return element
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