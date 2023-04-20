import { SwapUtility } from "./swapUtility";
function App() {
  new SwapUtility({Divid: "swap", appId: "test"})
  return (
    <>
     <h1>
      Testing swap
    </h1>
    <div id="swap" />
    </>
  );
}

export default App;
