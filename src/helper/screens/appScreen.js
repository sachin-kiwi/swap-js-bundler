import { makeApiRequest } from '../api'
import $ from 'jquery'

export const addListenersToButton = (id, event = 'click') => {
  document.addEventListener('click', function (e) {
    const walletConnect = e.target.closest('#walletConnectButton')
    if (walletConnect) {
      alert('wallet connect is clicked')
    }
  })
}

export const getAppScreen = async (appId) => {
  let data = {}
  try {
    data = await makeApiRequest(
      'http://localhost:8001/api/v1/app/fetchAppOptions',
      'POST',
      { appId },
    ).then((data) => data[0])
  } catch (error) {
    console.log(error)
    return `<div>Something Went Wrong.Please checks console</div>`
  }
  return `
        <tbody>
            <tr>
                <td>Address Pair</td>
                <td>
                ${data.addressPair
                  .map(
                    (pair) => `
                <div>
                    <span>${pair.name} (${pair.symbol})</span>
                    <img src="${pair.logo}" alt="${pair.name} logo" />
                </div>
                `,
                  )
                  .join('')}
                </td>
            </tr>
            <tr>
                <td>Liquidity at Registration</td>
                <td>${data.liqudityAtRegistration}</td>
            </tr>
            <tr>
                <td>Current Liquidity</td>
                <td>${data.currentLiquidity}</td>
            </tr>
        </tbody>

    `
}

export const getElementByIdOrCreate = async (screenId, appId) => {
  try {
    let element = document.getElementById(screenId)
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
    const htmlToAdd = await getAppScreen(appId)
    element.innerHTML = htmlToAdd
    return element
  } catch (error) {
    console.log(error)
    return null
  }
}
