import ReactDOMServer from 'react-dom/server';
export const jsxToHtml = (input) => ReactDOMServer.renderToString(input)
