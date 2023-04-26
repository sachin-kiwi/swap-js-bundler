import $ from "jquery";
import {getElementByIdOrCreate } from './helper/screens/appScreen';
import { makeApiRequest } from '../src/helper/api'
import { addFormListener } from "./helper/screens/formValidation";
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
                const data = await makeApiRequest('http://localhost:8001/api/v1/app/fetchAppOptions','POST',{ appId }).then(data=>data[0])
                this.element = await getElementByIdOrCreate(screenId,appId,data)
                addFormListener(appId)
            })
            this.bootUp = true
        } catch (error) {
            console.log(error)
        }
    }

}

export default SwapUtility;
