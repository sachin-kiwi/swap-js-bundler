import { configureChains, createClient, mainnet,connect,InjectedConnector,disconnect } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
export default class Dapp {
    constructor(appName,appId){
        this.appName = appName
        this.appId = appId
        const { chains, provider,  } = configureChains(
            [mainnet],
            [publicProvider()],
        )
        this.name =''
        this.wallet=''
        this.provider = provider
        this.chains = chains
        this.client = createClient({
            autoConnect: true,
            provider,
            connectors: [new InjectedConnector({chains})]
        })
        console.log(`Dapp Created with name ${appName}`)
    }

    async connectApp(){
      if (this.client.status === 'connected'){
        this.client.clearState()
      }
      await this.client.autoConnect()
      console.log(this.client.data.account)
    }

    async disconnect(){
        try {
            await disconnect()
            this.connector = null
            this.address = null
        } catch (error) {
            return {error,hasError:true}
        }
        return {hasError:false}
    }

    toString(){
        return JSON.stringify({
            name:this.appName,
            address:this.address
        })
    }
}
