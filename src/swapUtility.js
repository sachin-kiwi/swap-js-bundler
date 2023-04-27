import $ from "jquery";
import {createSwapUtlityScreen } from './helper/screens/appScreen';
import { makeApiRequest } from '../src/helper/api'
import { swapFormListener } from "./helper/screens/swapScreen";
import { appURL } from "./helper/config/constant";

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
                const data = await makeApiRequest(appURL.fetchApp,'POST',{ appId }).then(data=>data[0])
                this.element = await createSwapUtlityScreen(screenId,appId,data)
                swapFormListener(appId)
            })
            this.bootUp = true
        } catch (error) {
            console.log(error)
        }
    }

}

export default SwapUtility;
