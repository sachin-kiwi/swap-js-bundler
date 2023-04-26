import $ from "jquery";
import {getElementByIdOrCreate } from './helper/screens/appScreen';

class SwapUtility {
    constructor({screenId, appId}) {
        this.screenId = screenId
        this.appId = appId
        this.bootUp = false
        this.init(screenId,appId)
    }

    async init(screenId,appId){
        try {
            $(document).ready(async function() {
                this.element = await getElementByIdOrCreate(screenId,appId)
            })
            this.bootUp = true
        } catch (error) {
            console.log(error)
        }  
    }

}

export default SwapUtility;
