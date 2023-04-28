import $ from "jquery";
import {FormListener, createSwapUtlityScreen } from './helper/screens/appScreen';
import { makeApiRequest } from '../src/helper/api'
import { ACTIONS, appURL } from "./helper/config/constant";
import Dapp from "./helper/utils/dapp"

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
                let data = {}
                try {
                    data = await makeApiRequest(appURL.fetchApp,ACTIONS.post,{ appId }).then(data=>data[0])
                } catch (error) {
                    console.log(error)
                }
                const {element,hasError,screenName} = await createSwapUtlityScreen([screenId,appId].join("-"),appId,data,'walletScreen')
                this.element = element
                this.dapp = new Dapp(`app-${appId}`,appId)
                !hasError && FormListener(screenName,appId,this.dapp)
                this.screenName = screenName
            })
            this.bootUp = true
            // For Development usage only. It needs to be check
            // Possible EventEmitter memory leak detected. 11 accountsChanged listeners added. Use emitter.setMaxListeners() to increase limit
            // EventEmitter.setMaxListeners(20)
        } catch (error) {
            console.log(error)
        }
    }
}

export default SwapUtility;
