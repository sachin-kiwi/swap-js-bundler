import { alertColorSchema } from "../config/constant";

export default class Alert {
  constructor(appId) {
    const element = document.getElementById(`alert-popup-${appId}`)
    if (element){
        this.popup = element
    }else{
        this.popup = document.createElement('div');
        this.popup.id=`alert-popup-${appId}`;
        document.body.appendChild(this.popup)   
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
