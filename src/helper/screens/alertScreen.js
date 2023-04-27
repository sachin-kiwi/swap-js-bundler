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
  }

  showAlert(message) {
    this.popup.textContent = message;
    this.popup.style.display = 'block';
    setTimeout(() => {
        this.popup.textContent = '';
        this.popup.style.display = 'none';
    }, 5000);
  }
}
