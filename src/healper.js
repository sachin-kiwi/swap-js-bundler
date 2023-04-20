export const getWalletConnectScreen = ({
    swapFrom = "WETH",
    swapFromLogo = "URL",
    swapTo = "KiwiToken",
    swapToLogo = "URL",
}) => {
    return (`
        <div className="getParentScreen">
            <div className="swapItemToshow">
                <div className="swapFrom">
                    <span>${swapFrom}</span> <span>${swapFromLogo}</span>
                </div>
                <div className="swapTo">
                    <span>${swapTo}</span> <span>${swapToLogo}</span>
                </div>
            </div>
            <div className="walletConnectSec">
                <button className="walletConnectButton" id="walletConnectButton">
                    Wallet Connect
                </button>
            </div>
        </div>
    `)
}

export const addListnersToButton = () => {
    document.addEventListener("click", function(e){
        const walletConnect = e.target.closest("#walletConnectButton");
        if(walletConnect){
            alert("wallet connect is clicked");
        }
      });
}