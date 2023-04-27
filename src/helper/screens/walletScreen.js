export const WalletScreen = (props)=>{
    const {appId,data} = props
    return <>
        <section id={`wallet-container-${appId}`}>
            <h1 id={`title-${appId}`}>Swap Utility</h1>
        </section>
    </>
}