import $ from "jquery";
import {FormListener, createSwapUtlityScreen,switchAppScreen } from './helper/screens/appScreen';
import { makeApiRequest } from '../src/helper/api'
import { ACTIONS, appURL } from "./helper/config/constant";

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
                const data = await makeApiRequest(appURL.fetchApp,ACTIONS.post,{ appId }).then(data=>data[0])
                this.element = await createSwapUtlityScreen(screenId,appId,data)
                FormListener('swapScreen',appId)
                this.screenName = 'swapScreen'
            })
            this.bootUp = true
        } catch (error) {
            console.log(error)
        }
    }
    async switchScreen(screenName){
        // in case already in same screen then do nothing
        this.element = await switchAppScreen(this.screenId,this.appId,screenName)
        FormListener(this.appId,screenName)
    }

}

export default SwapUtility;
