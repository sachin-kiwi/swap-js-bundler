import $ from "jquery";
import {getWalletConnectScreen, addListnersToButton } from './healper';

class SwapUtility {
    constructor({Divid, appId}) {
    $(document).ready(function() {
    const parent = document.getElementById(Divid);
    const checkCount = $(`#${Divid}`).children( "div" );
        if (checkCount && checkCount?.length === 0) {
            addListnersToButton();
            const htmlToAdd = getWalletConnectScreen({});
            parent.innerHTML = htmlToAdd;
        }
    })
    }
}

export default SwapUtility;