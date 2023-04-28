export const ErrorScreen = (props) => {
  const { appId } = props
  return `
    <section id="errorScreen-container-${appId}" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 3px solid; min-width:500px; padding:1rem">
    Something Went Wrong.Please check console.
    </section>
  `
}
