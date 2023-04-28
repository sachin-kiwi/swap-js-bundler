import { alertColorSchema } from "../config/constant";

export default class Alert {
  constructor(appId) {
    const element = document.getElementById(`alert-popup-${appId}`)
    const mainScreen = document.getElementById(`appScreen-${appId}`) || document.body
    if (element){
        this.popup = element
    }else{
        this.popup = document.createElement('div');
        this.popup.id=`alert-popup-${appId}`;
        mainScreen.appendChild(this.popup)
    }
    this.popup.style.display = 'none';
    this.popup.style.position = 'fixed';
    this.popup.style.top = '10px';
    this.popup.style.right = '10px';
    this.popup.style.backgroundColor = '#fff';
    this.popup.style.border = '1px solid #ccc';
    this.popup.style.padding = '10px';
  }

  showAlert(message,type='error') {
    this.popup.textContent = message;
    this.popup.style.color = alertColorSchema.hasOwnProperty(type) 
      ? alertColorSchema[type] : 'black'
    this.popup.style.display = 'block';
    setTimeout(() => {
        this.popup.textContent = '';
        this.popup.style.display = 'none';
    }, 5000);
  }
}

// New Implementation for alers (WIP)
export  class Alertv2 {
  static showAlert(appId,message,type='error') {
    const element  = createAlertComponent(appId)
    element.textContent = message;
    element.color = alertColorSchema.hasOwnProperty(type) 
      ? alertColorSchema[type] : 'black'
    element.style.display = 'block';
    setTimeout(() => {
        element.textContent = '';
        element.style.display = 'none';
    }, 5000);
  }

}


 const createAlertComponent = (appId)=>{
  const element = document.getElementById(`alert-popup-${appId}`)
  const mainScreen = document.getElementById(`appScreen-${appId}`) || document.body
  if (!element){
      element = document.createElement('div');
      element.id=`alert-popup-${appId}`;
      element.style.display = 'none';
      element.style.position = 'fixed';
      element.style.top = '10px';
      element.style.right = '10px';
      element.style.backgroundColor = '#fff';
      element.style.border = '1px solid #ccc';
      element.style.padding = '10px';
      mainScreen.appendChild(element)
  }
  return element
 }