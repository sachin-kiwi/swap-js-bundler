import { appName } from '../config/constant'
import AlertComponent from './alertScreen'
import { FormListener } from './appScreen'
import { removeListener } from './utilities'

export const WalletScreen = (props) => {
  const { appId } = props
  return `
     <section id="walletScreen-container-${appId}" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 3px solid; min-width:500px; padding:1rem">
    <h1 id="title-${appId}" style="font-size: 2rem; font-weight: bold; text-align: center;">${appName}</h1>
    <form id="wallet-form-${appId}" style="display: flex; flex-direction: column; align-items: center;">
    <input type="submit" id="connect-${appId}" value="Connect" style="background-color: lightgray; border: none; border-radius: 0.25rem; padding: 0.5rem 1rem; margin-bottom: 1rem;"/>
    <input type="submit" id="disConnect-walletScreen-${appId}" value="DisConnect" style="background-color: lightblue; border: none; border-radius: 0.25rem; padding: 0.5rem 1rem; display: none;"/>
    </form>
    </section>
    `
}

export const walletFormListener = (appId, dapp) => {
  const alertBox = new AlertComponent(appId)
  const connectBtn = document.getElementById(`connect-${appId}`)
  const disConnectBtn = document.getElementById(
    `disConnect-walletScreen-${appId}`,
  )
  const swapScreen = document.getElementById(`swap-utlity-container-${appId}`)
  const walletScreen = document.getElementById(
    `walletScreen-container-${appId}`,
  )
  connectBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    await dapp.connectApp()
    console.log('connected data',dapp.toString())
    alertBox.showAlert('Connected', 'success')
    swapScreen.style.display = 'block'
    walletScreen.style.display = 'none'
    FormListener('swapScreen',appId)
  })
  // disConnectBtn.addEventListener('click', async function (e) {
  //   e.preventDefault()
  //   alertBox.showAlert('Disconnected', 'info')
  //   connectBtn.style.display = 'block'
  //   disConnectBtn.style.display = 'none'
  //   swapScreen.style.display = 'none'
  //   walletScreen.style.display = 'none'
  // })
}

export const removeWalletScreenListener = (appId) =>{
  const elements = document.querySelectorAll([`#disConnect-walletScreen-${appId}`,`#connect-${appId}`])
  elements.forEach(element=>{
    if (element){
      removeListener(element,'click')
    }
  })
}
