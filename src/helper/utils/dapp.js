import { configureChains, createClient, mainnet,InjectedConnector } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
export default class Dapp {
    constructor(appName,appId){
        this.data = {
            appName,appId,walletName:'',address:''
        }
        const { chains, provider,  } = configureChains(
            [mainnet],
            [publicProvider()],
        )
        this.data.provider = provider
        this.data.chains = chains
        this.client = createClient({
            autoConnect: true,
            provider,
            connectors: [new InjectedConnector({chains})]
        })
        console.log(`Dapp Created with name ${appName}`)
    }

    async connectApp(){
      console.log('app status',this.client.status)
    }

    async disconnectApp(){
        return {hasError:false}
    }

    toString(){
        return JSON.stringify(this.data)
    }
}
